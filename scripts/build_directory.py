#!/usr/bin/env python3
"""
Build a comprehensive low-vision provider directory from:
  1. CMS NPPES NPI Registry API  — taxonomy 152WL0500X (Low Vision Rehab Optometrist)
  2. VA Blind Rehabilitation Centers — hardcoded from VA.gov (complete list)
  3. State blind agencies / VR agencies — all 50 states + DC
  4. Major national nonprofits / clinics not in NPI

Outputs: directorySeed_new.ts  (imports Resource type, default-exports the array)
"""

import json
import re
import sys
import time
import requests
from pathlib import Path

# ── helpers ───────────────────────────────────────────────────────────────────

def safe_str(v):
    return str(v).strip() if v else ""

def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:60]

def nppes_search(state: str, taxonomy_desc: str = "152WL0500X",
                 skip: int = 0, limit: int = 200) -> list:
    url = "https://npiregistry.cms.hhs.gov/api/"
    params = {
        "version":              "2.1",
        "taxonomy_description": taxonomy_desc,
        "state":                state,
        "skip":                 skip,
        "limit":                limit,
    }
    try:
        r = requests.get(url, params=params, timeout=30)
        r.raise_for_status()
        data = r.json()
        return data.get("results", [])
    except Exception as e:
        print(f"  WARN  NPPES {state} skip={skip}: {e}", file=sys.stderr)
        return []

def nppes_get_all(state: str, taxonomy_desc: str = "152WL0500X") -> list:
    all_results, skip = [], 0
    while True:
        batch = nppes_search(state, taxonomy_desc, skip=skip, limit=200)
        all_results.extend(batch)
        if len(batch) < 200:
            break
        skip += 200
        time.sleep(0.3)
    return all_results

def extract_address(result: dict) -> dict:
    addrs = result.get("addresses", [])
    # Prefer LOCATION over MAILING
    loc = next((a for a in addrs if a.get("address_purpose") == "LOCATION"), None)
    if not loc and addrs:
        loc = addrs[0]
    if not loc:
        return {}
    return {
        "address1": safe_str(loc.get("address_1", "")),
        "address2": safe_str(loc.get("address_2", "")),
        "city":     safe_str(loc.get("city", "")),
        "state":    safe_str(loc.get("state", "")),
        "zip":      safe_str(loc.get("postal_code", ""))[:5],
        "phone":    safe_str(loc.get("telephone_number", "")),
    }

def nppes_to_resource(result: dict, seen_ids: set) -> dict | None:
    npi   = safe_str(result.get("number", ""))
    etype = safe_str(result.get("enumeration_type", ""))  # NPI-1 or NPI-2

    basic = result.get("basic", {})
    if etype == "NPI-2":
        org_name = safe_str(basic.get("organization_name", ""))
        if not org_name:
            return None
        display = org_name
    else:
        last  = safe_str(basic.get("last_name", ""))
        first = safe_str(basic.get("first_name", ""))
        cred  = safe_str(basic.get("credential", ""))
        if not last:
            return None
        display = f"Dr. {first} {last}"
        if cred:
            display += f", {cred}"

    addr = extract_address(result)
    state = addr.get("state", "")
    city  = addr.get("city", "")
    if not state:
        return None

    # Build ID
    base_id = slug(f"{state}-{display}-{city}")[:50]
    uid = base_id
    counter = 2
    while uid in seen_ids:
        uid = f"{base_id}-{counter}"
        counter += 1
    seen_ids.add(uid)

    phone = addr.get("phone", "")
    if phone and not phone.startswith("("):
        phone = re.sub(r"(\d{3})(\d{3})(\d{4})$", r"(\1) \2-\3", phone.replace("-", "").replace(" ",""))

    entry = {
        "id":               uid,
        "jurisdiction":     state,
        "country":          "US",
        "organizationName": display,
        "serviceTypes":     ["Low Vision Clinic"],
        "audienceTypes":    ["Adult", "Senior"],
        "virtualAvailable": False,
        "referralRequired": True,
        "insuranceNotes":   "Medicare, most major insurance accepted; verify coverage before visit.",
        "costNotes":        "Standard clinical billing. Ask about sliding scale or financial assistance.",
        "tags":             ["clinical", "low-vision-rehab", "optometrist"],
        "sourceType":       "nppes",
        "npi":              npi,
    }
    if phone:
        entry["phone"] = phone
    if city:
        entry["city"] = city
    if addr.get("zip"):
        entry["zip"] = addr["zip"]
    addr1 = addr.get("address1","")
    addr2 = addr.get("address2","")
    full_addr = addr1
    if addr2:
        full_addr += f", {addr2}"
    if full_addr:
        entry["address"] = f"{full_addr}, {city}, {state} {addr.get('zip','')}"

    return entry

# ── VA BRCs ───────────────────────────────────────────────────────────────────

VA_BRCS = [
    {"id":"va-brc-hines",        "city":"Hines",          "state":"IL", "name":"VA Central Blind Rehabilitation Center – Hines", "phone":"(708) 202-8387"},
    {"id":"va-brc-palo-alto",    "city":"Palo Alto",      "state":"CA", "name":"VA Western Blind Rehabilitation Center – Palo Alto", "phone":"(650) 493-5000"},
    {"id":"va-brc-west-haven",   "city":"West Haven",     "state":"CT", "name":"VA Eastern Blind Rehabilitation Center – West Haven", "phone":"(203) 932-5711"},
    {"id":"va-brc-tacoma",       "city":"Tacoma",         "state":"WA", "name":"VA American Lake Blind Rehabilitation Center – Tacoma", "phone":"(253) 582-8440"},
    {"id":"va-brc-waco",         "city":"Waco",           "state":"TX", "name":"VA Waco Blind Rehabilitation Center – Waco", "phone":"(254) 297-3000"},
    {"id":"va-brc-birmingham",   "city":"Birmingham",     "state":"AL", "name":"VA Southeastern Blind Rehabilitation Center – Birmingham", "phone":"(205) 933-8101"},
    {"id":"va-brc-san-juan",     "city":"San Juan",       "state":"PR", "name":"VA Puerto Rico Blind Rehabilitation Center – San Juan", "phone":"(787) 641-7582"},
    {"id":"va-brc-tucson",       "city":"Tucson",         "state":"AZ", "name":"VA Southwestern Blind Rehabilitation Center – Tucson", "phone":"(520) 792-1450"},
    {"id":"va-brc-augusta",      "city":"Augusta",        "state":"GA", "name":"VA Augusta Blind Rehabilitation Center – Augusta", "phone":"(706) 733-0188"},
    {"id":"va-brc-west-palm",    "city":"West Palm Beach","state":"FL", "name":"VA West Palm Beach Blind Rehabilitation Center – West Palm Beach", "phone":"(561) 422-8262"},
    {"id":"va-brc-long-beach",   "city":"Long Beach",     "state":"CA", "name":"VA Long Beach Blind Rehabilitation Center – Long Beach", "phone":"(562) 826-8000"},
    {"id":"va-brc-biloxi",       "city":"Biloxi",         "state":"MS", "name":"VA Biloxi Blind Rehabilitation Center – Biloxi", "phone":"(228) 523-5000"},
    {"id":"va-brc-cleveland",    "city":"Cleveland",      "state":"OH", "name":"VA Louis Stokes Cleveland Blind Rehabilitation Center – Cleveland", "phone":"(216) 791-3800"},
]

def make_va_brc(brc: dict) -> dict:
    return {
        "id":               brc["id"],
        "jurisdiction":     brc["state"],
        "country":          "US",
        "organizationName": brc["name"],
        "serviceTypes":     ["Low Vision Clinic", "Vision Rehabilitation Therapy", "O&M Training", "Assistive Technology"],
        "audienceTypes":    ["Adult"],
        "phone":            brc["phone"],
        "website":          "https://www.va.gov/health-care/health-needs-conditions/vision-care/blind-low-vision-rehab-services/",
        "city":             brc["city"],
        "state":            brc["state"],
        "virtualAvailable": True,
        "insuranceNotes":   "VA enrolled Veterans only. Must be enrolled in VA healthcare system.",
        "costNotes":        "Free for eligible Veterans.",
        "referralRequired": True,
        "availabilityNotes":"Referral from VA VIST coordinator or primary care provider required.",
        "tags":             ["veterans", "blind-rehab", "low-vision", "rehabilitation", "residential"],
        "sourceType":       "federal",
    }

# ── State blind agencies (all 50 + DC) ───────────────────────────────────────
# Only states NOT already in the existing seed file

STATE_AGENCIES_MISSING = [
    # AL
    {"state":"AL","city":"Montgomery","id":"al-rsa-blind","name":"Alabama Department of Rehabilitation Services – Blind & Vision Impaired",
     "phone":"(800) 441-7607","website":"https://www.rehab.alabama.gov","serviceTypes":["State Blind Agency","Vocational Rehabilitation","Assistive Technology"],
     "tags":["state-agency","vocational","independent-living"]},
    # AK
    {"state":"AK","city":"Juneau","id":"ak-sds-blind","name":"Alaska Division of Vocational Rehabilitation – Visual Impairment Services",
     "phone":"(800) 478-2815","website":"https://labor.alaska.gov/dvr/","serviceTypes":["State Blind Agency","Vocational Rehabilitation"],
     "tags":["state-agency","vocational"]},
    # AR
    {"state":"AR","city":"Little Rock","id":"ar-blind-services","name":"Arkansas Division of Services for the Blind",
     "phone":"(501) 682-5463","website":"https://humanservices.arkansas.gov/about-dhs/dsb/","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training"],
     "tags":["state-agency","vocational","independent-living"]},
    # AZ blind agency
    {"state":"AZ","city":"Phoenix","id":"az-azde-blind","name":"Arizona Department of Economic Security – Services for the Blind",
     "phone":"(602) 771-9105","website":"https://des.az.gov/services/disability/visual-impairment","serviceTypes":["State Blind Agency","Vocational Rehabilitation","Assistive Technology"],
     "tags":["state-agency","vocational","technology"]},
    # CO (already has VA VIST; add blind agency)
    {"state":"CO","city":"Denver","id":"co-cvr-blind","name":"Colorado Division of Vocational Rehabilitation – Vision Services",
     "phone":"(888) 480-3808","website":"https://dvr.colorado.gov","serviceTypes":["State Blind Agency","Vocational Rehabilitation","Assistive Technology"],
     "tags":["state-agency","vocational"]},
    # CT
    {"state":"CT","city":"Hartford","id":"ct-bsvi","name":"Connecticut Board of Education and Services for the Blind (BESB)",
     "phone":"(860) 602-4000","website":"https://portal.ct.gov/BESB","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training","Assistive Technology"],
     "tags":["state-agency","vocational","independent-living","school"]},
    # DE
    {"state":"DE","city":"Dover","id":"de-dvr-blind","name":"Delaware Division for the Visually Impaired (DVI)",
     "phone":"(302) 255-9800","website":"https://dhss.delaware.gov/dhss/dvi/","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training"],
     "tags":["state-agency","vocational","independent-living"]},
    # HI
    {"state":"HI","city":"Honolulu","id":"hi-dvr-blind","name":"Hawaii Division of Vocational Rehabilitation – Visual Impairment Unit",
     "phone":"(808) 586-5366","website":"https://labor.hawaii.gov/dvr/","serviceTypes":["State Blind Agency","Vocational Rehabilitation"],
     "tags":["state-agency","vocational"]},
    # ID
    {"state":"ID","city":"Boise","id":"id-cdhd-blind","name":"Idaho Commission for the Blind and Visually Impaired (ICBVI)",
     "phone":"(208) 334-3220","website":"https://icbvi.idaho.gov","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training","Assistive Technology"],
     "tags":["state-agency","vocational","independent-living"]},
    # IN
    {"state":"IN","city":"Indianapolis","id":"in-fssa-blind","name":"Indiana Family & Social Services Administration – Blind & Visually Impaired Services",
     "phone":"(800) 545-7763","website":"https://www.in.gov/fssa/ddrs/about-us/blind-visually-impaired/","serviceTypes":["State Blind Agency","Vocational Rehabilitation"],
     "tags":["state-agency","vocational"]},
    # IA
    {"state":"IA","city":"Des Moines","id":"ia-idb","name":"Iowa Department for the Blind",
     "phone":"(515) 281-1333","website":"https://idb.iowa.gov","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training","Assistive Technology","Talking Book Library"],
     "tags":["state-agency","vocational","library","independent-living"]},
    # KS
    {"state":"KS","city":"Topeka","id":"ks-dvr-blind","name":"Kansas Division of Services for the Blind (KBVS)",
     "phone":"(785) 296-7387","website":"https://www.dcf.ks.gov/services/DisabilityServices/Pages/VRHomePage.aspx","serviceTypes":["State Blind Agency","Vocational Rehabilitation"],
     "tags":["state-agency","vocational"]},
    # KY
    {"state":"KY","city":"Frankfort","id":"ky-obvs","name":"Kentucky Office for the Blind",
     "phone":"(800) 321-6668","website":"https://kcc.ky.gov/vr/kofb/Pages/default.aspx","serviceTypes":["State Blind Agency","Vocational Rehabilitation","Assistive Technology"],
     "tags":["state-agency","vocational","technology"]},
    # LA
    {"state":"LA","city":"Baton Rouge","id":"la-lcb","name":"Louisiana Workforce Commission – Louisiana Commission for the Blind",
     "phone":"(800) 234-9995","website":"https://lcb.louisiana.gov","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training"],
     "tags":["state-agency","vocational","independent-living"]},
    # ME
    {"state":"ME","city":"Augusta","id":"me-dbvs","name":"Maine Division for the Blind and Visually Impaired (DBVI)",
     "phone":"(800) 760-1573","website":"https://www.maine.gov/rehab/dvr/index.html","serviceTypes":["State Blind Agency","Vocational Rehabilitation","Assistive Technology"],
     "tags":["state-agency","vocational"]},
    # MD
    {"state":"MD","city":"Baltimore","id":"md-msde-blind","name":"Maryland State Department of Education – Division of Rehabilitation Services – Blind Unit",
     "phone":"(410) 554-9442","website":"https://dors.maryland.gov","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training"],
     "tags":["state-agency","vocational","rehabilitation"]},
    # MO
    {"state":"MO","city":"Jefferson City","id":"mo-rdb","name":"Missouri Rehabilitation Services for the Blind (RSB)",
     "phone":"(573) 526-3611","website":"https://dss.mo.gov/fsd/rsb/","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training","Assistive Technology"],
     "tags":["state-agency","vocational","independent-living"]},
    # MT
    {"state":"MT","city":"Helena","id":"mt-dvr-blind","name":"Montana Vocational Rehabilitation – Blind Services",
     "phone":"(406) 444-2590","website":"https://dphhs.mt.gov/detd/vocationalrehabilitation","serviceTypes":["State Blind Agency","Vocational Rehabilitation"],
     "tags":["state-agency","vocational"]},
    # NE
    {"state":"NE","city":"Lincoln","id":"ne-ncb","name":"Nebraska Commission for the Blind and Visually Impaired (NCBVI)",
     "phone":"(402) 471-2891","website":"https://ncbvi.ne.gov","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training","Assistive Technology"],
     "tags":["state-agency","vocational","independent-living"]},
    # NV
    {"state":"NV","city":"Las Vegas","id":"nv-detr-blind","name":"Nevada Blind Business Enterprise Program / DETR – Disability Services",
     "phone":"(775) 684-4040","website":"https://detr.nv.gov/Page/Rehabilitation_Division","serviceTypes":["State Blind Agency","Vocational Rehabilitation"],
     "tags":["state-agency","vocational"]},
    # NH
    {"state":"NH","city":"Concord","id":"nh-svr-blind","name":"New Hampshire Services for Blind and Visually Impaired (SBVI)",
     "phone":"(603) 271-3537","website":"https://www.education.nh.gov/career-development/vocational-rehabilitation","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training"],
     "tags":["state-agency","vocational","independent-living"]},
    # NM
    {"state":"NM","city":"Albuquerque","id":"nm-commission-blind","name":"New Mexico Commission for the Blind",
     "phone":"(505) 841-8844","website":"https://www.cfb.state.nm.us","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training","Assistive Technology"],
     "tags":["state-agency","vocational","independent-living"]},
    # ND
    {"state":"ND","city":"Bismarck","id":"nd-vr-blind","name":"North Dakota Vocational Rehabilitation – Vision Rehabilitation Unit",
     "phone":"(701) 328-8950","website":"https://www.nd.gov/dhs/dvr/","serviceTypes":["State Blind Agency","Vocational Rehabilitation"],
     "tags":["state-agency","vocational"]},
    # OK
    {"state":"OK","city":"Oklahoma City","id":"ok-dvs-blind","name":"Oklahoma Division of Visual Services (DVS)",
     "phone":"(405) 951-3400","website":"https://www.okrehab.org/vs","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training","Assistive Technology"],
     "tags":["state-agency","vocational","independent-living"]},
    # OR
    {"state":"OR","city":"Salem","id":"or-commission-blind","name":"Oregon Commission for the Blind (OCB)",
     "phone":"(971) 673-1588","website":"https://www.oregon.gov/blind","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training","Assistive Technology"],
     "tags":["state-agency","vocational","technology","independent-living"]},
    # RI
    {"state":"RI","city":"Providence","id":"ri-ors-blind","name":"Rhode Island Office of Rehabilitation Services – Visual Impairment Unit",
     "phone":"(401) 421-7005","website":"https://ors.ri.gov","serviceTypes":["State Blind Agency","Vocational Rehabilitation"],
     "tags":["state-agency","vocational"]},
    # SC
    {"state":"SC","city":"Columbia","id":"sc-bcb","name":"South Carolina Commission for the Blind (SCCB)",
     "phone":"(803) 898-8731","website":"https://www.sccb.sc.gov","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training","Assistive Technology"],
     "tags":["state-agency","vocational","independent-living"]},
    # SD
    {"state":"SD","city":"Pierre","id":"sd-dss-blind","name":"South Dakota Division of Rehabilitation Services – Blind Services",
     "phone":"(605) 773-3195","website":"https://dss.sd.gov/rehabilitationservices/blindvisuallyimpaired.aspx","serviceTypes":["State Blind Agency","Vocational Rehabilitation"],
     "tags":["state-agency","vocational"]},
    # TN
    {"state":"TN","city":"Nashville","id":"tn-tn-blind","name":"Tennessee Department of Human Services – Tennessee Services for the Blind",
     "phone":"(800) 628-7818","website":"https://www.tn.gov/humanservices/rehabilitation-services/adult-services/tsd-for-the-blind.html","serviceTypes":["State Blind Agency","Vocational Rehabilitation","Assistive Technology"],
     "tags":["state-agency","vocational","technology"]},
    # UT
    {"state":"UT","city":"Salt Lake City","id":"ut-usbg","name":"Utah State Office of Rehabilitation – Blind & Low Vision Services",
     "phone":"(800) 473-7530","website":"https://usor.utah.gov/visual-disabilities/","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training","Assistive Technology"],
     "tags":["state-agency","vocational","independent-living"]},
    # VT
    {"state":"VT","city":"Waterbury","id":"vt-dvr-blind","name":"Vermont Division for the Blind and Visually Impaired (DBVI)",
     "phone":"(802) 241-1390","website":"https://dbvi.vermont.gov","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training","Assistive Technology"],
     "tags":["state-agency","vocational","independent-living"]},
    # WV
    {"state":"WV","city":"Charleston","id":"wv-dvrs-blind","name":"West Virginia Division of Rehabilitation Services – Blind/Vision Impaired",
     "phone":"(800) 642-8207","website":"https://www.wvdrs.org","serviceTypes":["State Blind Agency","Vocational Rehabilitation","Assistive Technology"],
     "tags":["state-agency","vocational"]},
    # WI
    {"state":"WI","city":"Madison","id":"wi-dbs","name":"Wisconsin Division of Vocational Rehabilitation – Blindness and Visual Impairment Program",
     "phone":"(800) 442-3477","website":"https://dwd.wisconsin.gov/dvr/","serviceTypes":["State Blind Agency","Vocational Rehabilitation","Assistive Technology"],
     "tags":["state-agency","vocational","technology"]},
    # WY
    {"state":"WY","city":"Cheyenne","id":"wy-vr-blind","name":"Wyoming Department of Workforce Services – Vocational Rehabilitation (Visual Impairment)",
     "phone":"(307) 777-8650","website":"https://wyomingworkforce.org/workers/vr/","serviceTypes":["State Blind Agency","Vocational Rehabilitation"],
     "tags":["state-agency","vocational"]},
    # MS (add beyond the VA BRC)
    {"state":"MS","city":"Jackson","id":"ms-msb","name":"Mississippi State Agency for the Blind (MSAB)",
     "phone":"(601) 351-1586","website":"https://www.msab.ms.gov","serviceTypes":["State Blind Agency","Vocational Rehabilitation","O&M Training"],
     "tags":["state-agency","vocational","independent-living"]},
    # PR
    {"state":"PR","city":"San Juan","id":"pr-vrp-blind","name":"Puerto Rico Department of Labor – Vocational Rehabilitation Administration (Visual Impairment)",
     "phone":"(787) 729-0160","website":"https://www.trabajo.pr.gov/","serviceTypes":["State Blind Agency","Vocational Rehabilitation"],
     "tags":["state-agency","vocational"]},
]

def make_state_agency(row: dict) -> dict:
    return {
        "id":               row["id"],
        "jurisdiction":     row["state"],
        "country":          "US",
        "organizationName": row["name"],
        "serviceTypes":     row.get("serviceTypes", ["State Blind Agency","Vocational Rehabilitation"]),
        "audienceTypes":    ["All Ages"],
        "phone":            row.get("phone",""),
        "website":          row.get("website",""),
        "city":             row.get("city",""),
        "state":            row["state"],
        "virtualAvailable": True,
        "insuranceNotes":   "No insurance required. Federally funded program.",
        "costNotes":        "Free services for eligible residents.",
        "referralRequired": False,
        "availabilityNotes":"Apply online, by phone, or at a regional office.",
        "tags":             row.get("tags", ["state-agency","vocational"]),
        "sourceType":       "state-agency",
    }

# ── Major clinical / nonprofit entries not in existing seed ───────────────────

CURATED_EXTRA = [
    # Wilmer Eye Inst. - top academic center
    {
        "id": "md-wilmer-low-vision",
        "jurisdiction": "MD",
        "country": "US",
        "organizationName": "Johns Hopkins Wilmer Eye Institute – Low Vision Service",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(410) 955-5080",
        "website": "https://www.hopkinsmedicine.org/wilmer",
        "address": "600 N Wolfe St, Baltimore, MD 21287",
        "city": "Baltimore",
        "state": "MD",
        "zip": "21287",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most major insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading", "comprehensive"],
        "sourceType": "academic-medical-center",
    },
    # Wills Eye – Philadelphia
    {
        "id": "pa-wills-eye",
        "jurisdiction": "PA",
        "country": "US",
        "organizationName": "Wills Eye Hospital – Low Vision Service",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(215) 928-3000",
        "website": "https://www.willseye.org",
        "address": "840 Walnut St, Philadelphia, PA 19107",
        "city": "Philadelphia",
        "state": "PA",
        "zip": "19107",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "reading", "comprehensive"],
        "sourceType": "academic-medical-center",
    },
    # Kellogg Eye Center – Michigan
    {
        "id": "mi-kellogg-low-vision",
        "jurisdiction": "MI",
        "country": "US",
        "organizationName": "University of Michigan Kellogg Eye Center – Low Vision Rehabilitation",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy", "Assistive Technology"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(734) 763-5874",
        "website": "https://www.kellogg.umich.edu/patientcare/services/lowvision.html",
        "address": "1000 Wall St, Ann Arbor, MI 48105",
        "city": "Ann Arbor",
        "state": "MI",
        "zip": "48105",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most major insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading", "technology"],
        "sourceType": "academic-medical-center",
    },
    # Dean McGee – Oklahoma
    {
        "id": "ok-dean-mcgee",
        "jurisdiction": "OK",
        "country": "US",
        "organizationName": "Dean McGee Eye Institute – Low Vision Clinic",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(405) 271-6060",
        "website": "https://www.dmei.org",
        "address": "608 Stanton L Young Blvd, Oklahoma City, OK 73104",
        "city": "Oklahoma City",
        "state": "OK",
        "zip": "73104",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Casey Eye Inst. – Oregon
    {
        "id": "or-casey-eye",
        "jurisdiction": "OR",
        "country": "US",
        "organizationName": "OHSU Casey Eye Institute – Low Vision Rehabilitation",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(503) 494-3000",
        "website": "https://www.ohsu.edu/casey-eye-institute",
        "address": "3375 SW Terwilliger Blvd, Portland, OR 97239",
        "city": "Portland",
        "state": "OR",
        "zip": "97239",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare, Oregon Health Plan, most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Moran Eye Center – Utah
    {
        "id": "ut-moran-eye",
        "jurisdiction": "UT",
        "country": "US",
        "organizationName": "John A. Moran Eye Center – Low Vision Clinic",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(801) 581-2352",
        "website": "https://healthcare.utah.edu/moran",
        "address": "65 N Mario Capecchi Dr, Salt Lake City, UT 84132",
        "city": "Salt Lake City",
        "state": "UT",
        "zip": "84132",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Duke Eye Center – NC
    {
        "id": "nc-duke-eye",
        "jurisdiction": "NC",
        "country": "US",
        "organizationName": "Duke Eye Center – Low Vision Rehabilitation",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(919) 684-2038",
        "website": "https://eyecenter.duke.edu",
        "address": "2351 Erwin Rd, Durham, NC 27705",
        "city": "Durham",
        "state": "NC",
        "zip": "27705",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and major insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Truhlsen Eye Institute – Nebraska
    {
        "id": "ne-truhlsen-eye",
        "jurisdiction": "NE",
        "country": "US",
        "organizationName": "Stanley M. Truhlsen Eye Institute – Low Vision Clinic",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(402) 559-2020",
        "website": "https://www.unmc.edu/truhlsen/",
        "address": "985540 Nebraska Medical Center, Omaha, NE 68198",
        "city": "Omaha",
        "state": "NE",
        "zip": "68198",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Emory Eye Center – GA
    {
        "id": "ga-emory-eye",
        "jurisdiction": "GA",
        "country": "US",
        "organizationName": "Emory Eye Center – Low Vision Rehabilitation",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(404) 778-2020",
        "website": "https://www.emoryhealthcare.org/eye-center/",
        "address": "1365 Clifton Rd NE, Atlanta, GA 30322",
        "city": "Atlanta",
        "state": "GA",
        "zip": "30322",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Storm Eye Inst. – SC
    {
        "id": "sc-storm-eye",
        "jurisdiction": "SC",
        "country": "US",
        "organizationName": "MUSC Storm Eye Institute – Low Vision Clinic",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(843) 792-2020",
        "website": "https://muschealth.org/medical-services/eye",
        "address": "167 Ashley Ave, Charleston, SC 29425",
        "city": "Charleston",
        "state": "SC",
        "zip": "29425",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Vanderbilt Eye Inst. – TN
    {
        "id": "tn-vanderbilt-eye",
        "jurisdiction": "TN",
        "country": "US",
        "organizationName": "Vanderbilt Eye Institute – Low Vision Services",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(615) 936-2020",
        "website": "https://www.vumc.org/eye-institute/",
        "address": "2311 Pierce Ave, Nashville, TN 37232",
        "city": "Nashville",
        "state": "TN",
        "zip": "37232",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # UAB Callahan Eye Hosp. – AL
    {
        "id": "al-callahan-eye",
        "jurisdiction": "AL",
        "country": "US",
        "organizationName": "UAB Callahan Eye Hospital – Low Vision Rehabilitation",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(205) 325-8100",
        "website": "https://www.uab.edu/callahaneye/",
        "address": "1720 University Blvd, Birmingham, AL 35233",
        "city": "Birmingham",
        "state": "AL",
        "zip": "35233",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Iowa / Carver College of Medicine
    {
        "id": "ia-carver-eye",
        "jurisdiction": "IA",
        "country": "US",
        "organizationName": "University of Iowa Hospitals & Clinics – Low Vision Clinic",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(319) 356-2852",
        "website": "https://uihc.org/departments/ophthalmology-visual-sciences",
        "address": "200 Hawkins Dr, Iowa City, IA 52242",
        "city": "Iowa City",
        "state": "IA",
        "zip": "52242",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Devers Eye Inst. – OR
    {
        "id": "or-devers-eye",
        "jurisdiction": "OR",
        "country": "US",
        "organizationName": "Legacy Devers Eye Institute – Low Vision Clinic",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy", "O&M Training"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(503) 413-8423",
        "website": "https://www.legacyhealth.org/locations/hospitals/legacy-good-samaritan-medical-center/devers-eye-institute.aspx",
        "address": "1040 NW 22nd Ave, Portland, OR 97210",
        "city": "Portland",
        "state": "OR",
        "zip": "97210",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "reading", "mobility"],
        "sourceType": "academic-medical-center",
    },
    # Associated Services for the Blind – PA
    {
        "id": "pa-asb-philly",
        "jurisdiction": "PA",
        "country": "US",
        "organizationName": "Associated Services for the Blind and Visually Impaired (ASB) – Philadelphia",
        "serviceTypes": ["Vision Rehabilitation Therapy", "Assistive Technology", "O&M Training", "Employment Support"],
        "audienceTypes": ["All Ages"],
        "phone": "(215) 627-0600",
        "website": "https://www.asb.org",
        "address": "919 Walnut St, Philadelphia, PA 19107",
        "city": "Philadelphia",
        "state": "PA",
        "zip": "19107",
        "virtualAvailable": True,
        "insuranceNotes": "Most services fee-based; sliding scale available.",
        "costNotes": "Sliding scale financial assistance available.",
        "referralRequired": False,
        "tags": ["nonprofit", "rehabilitation", "technology", "employment"],
        "sourceType": "nonprofit",
    },
    # Cincinnati Eye Inst. – OH
    {
        "id": "oh-cincinnati-eye",
        "jurisdiction": "OH",
        "country": "US",
        "organizationName": "Cincinnati Eye Institute – Low Vision Services",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(513) 984-5133",
        "website": "https://www.cincinnatieye.com",
        "address": "10494 Montgomery Rd, Cincinnati, OH 45242",
        "city": "Cincinnati",
        "state": "OH",
        "zip": "45242",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Carroll Center – MA
    {
        "id": "ma-carroll-center",
        "jurisdiction": "MA",
        "country": "US",
        "organizationName": "Carroll Center for the Blind – Newton",
        "serviceTypes": ["Vision Rehabilitation Therapy", "O&M Training", "Assistive Technology", "Employment Support"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(617) 969-6200",
        "website": "https://carroll.org",
        "address": "770 Centre St, Newton, MA 02458",
        "city": "Newton",
        "state": "MA",
        "zip": "02458",
        "virtualAvailable": True,
        "insuranceNotes": "Some insurance accepted; sliding scale available.",
        "costNotes": "Sliding scale. Residential and day programs.",
        "referralRequired": False,
        "tags": ["nonprofit", "rehabilitation", "employment", "technology", "residential"],
        "sourceType": "nonprofit",
    },
    # The Blind Center of Nevada – NV
    {
        "id": "nv-blind-center",
        "jurisdiction": "NV",
        "country": "US",
        "organizationName": "The Blind Center of Nevada – Las Vegas",
        "serviceTypes": ["Vision Rehabilitation Therapy", "Assistive Technology", "Employment Support", "O&M Training"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(702) 642-0100",
        "website": "https://blindcenter.org",
        "address": "1001 N Bruce St, North Las Vegas, NV 89030",
        "city": "North Las Vegas",
        "state": "NV",
        "zip": "89030",
        "virtualAvailable": False,
        "insuranceNotes": "No insurance required for most services.",
        "costNotes": "Many services free or low-cost.",
        "referralRequired": False,
        "tags": ["nonprofit", "rehabilitation", "technology", "employment"],
        "sourceType": "nonprofit",
    },
    # Arizona Center for the Blind – AZ
    {
        "id": "az-acb-tucson",
        "jurisdiction": "AZ",
        "country": "US",
        "organizationName": "Arizona Center for the Blind and Visually Impaired (ACBVI) – Phoenix",
        "serviceTypes": ["Vision Rehabilitation Therapy", "O&M Training", "Assistive Technology", "Employment Support"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(602) 273-7411",
        "website": "https://acbvi.org",
        "address": "3100 E Roosevelt St, Phoenix, AZ 85008",
        "city": "Phoenix",
        "state": "AZ",
        "zip": "85008",
        "virtualAvailable": False,
        "insuranceNotes": "Services available regardless of insurance.",
        "costNotes": "Sliding scale; free for those who qualify.",
        "referralRequired": False,
        "tags": ["nonprofit", "rehabilitation", "mobility", "employment"],
        "sourceType": "nonprofit",
    },
    # The Abilities Center – WI
    {
        "id": "wi-vision-forward",
        "jurisdiction": "WI",
        "country": "US",
        "organizationName": "Vision Forward Association – Milwaukee",
        "serviceTypes": ["Vision Rehabilitation Therapy", "Assistive Technology", "O&M Training", "Employment Support", "School/TVI Services"],
        "audienceTypes": ["All Ages"],
        "phone": "(414) 615-0100",
        "website": "https://visionforward.org",
        "address": "912 N Hawley Rd, Milwaukee, WI 53213",
        "city": "Milwaukee",
        "state": "WI",
        "zip": "53213",
        "virtualAvailable": True,
        "insuranceNotes": "No insurance required for most services.",
        "costNotes": "Sliding scale available.",
        "referralRequired": False,
        "tags": ["nonprofit", "rehabilitation", "technology", "school"],
        "sourceType": "nonprofit",
    },
    # San Francisco Lighthouse – CA
    {
        "id": "ca-lighthouse-sf",
        "jurisdiction": "CA",
        "country": "US",
        "organizationName": "Lighthouse for the Blind of San Francisco",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy", "Assistive Technology", "O&M Training", "Employment Support"],
        "audienceTypes": ["All Ages"],
        "phone": "(415) 431-1481",
        "website": "https://lighthouse-sf.org",
        "address": "214 Van Ness Ave, San Francisco, CA 94102",
        "city": "San Francisco",
        "state": "CA",
        "zip": "94102",
        "virtualAvailable": True,
        "insuranceNotes": "Medicare and most insurance accepted for clinical services.",
        "costNotes": "Sliding scale for non-clinical services.",
        "referralRequired": False,
        "tags": ["nonprofit", "low-vision", "rehabilitation", "employment", "technology"],
        "sourceType": "nonprofit",
    },
    # Doheny Eye Centers – CA
    {
        "id": "ca-doheny-usc",
        "jurisdiction": "CA",
        "country": "US",
        "organizationName": "USC Roski Eye Institute / Doheny Eye Centers – Low Vision Clinic",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(323) 442-6335",
        "website": "https://dohenyeyecenters.org",
        "address": "1450 San Pablo St, Los Angeles, CA 90033",
        "city": "Los Angeles",
        "state": "CA",
        "zip": "90033",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Lions World Services for the Blind – AR
    {
        "id": "ar-lions-world",
        "jurisdiction": "AR",
        "country": "US",
        "organizationName": "Lions World Services for the Blind – Little Rock",
        "serviceTypes": ["Vision Rehabilitation Therapy", "O&M Training", "Employment Support", "Assistive Technology"],
        "audienceTypes": ["Adult"],
        "phone": "(501) 664-7100",
        "website": "https://lwsb.org",
        "address": "2811 Fair Park Blvd, Little Rock, AR 72204",
        "city": "Little Rock",
        "state": "AR",
        "zip": "72204",
        "virtualAvailable": False,
        "insuranceNotes": "No insurance required; funded through Lions International and state contracts.",
        "costNotes": "Free or low-cost for qualifying individuals.",
        "referralRequired": False,
        "tags": ["nonprofit", "rehabilitation", "employment", "residential"],
        "sourceType": "nonprofit",
    },
    # Opportunities for Vision – NM
    {
        "id": "nm-nmcb-lv-clinic",
        "jurisdiction": "NM",
        "country": "US",
        "organizationName": "New Mexico Commission for the Blind – Low Vision Clinic (Albuquerque)",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["All Ages"],
        "phone": "(505) 841-8844",
        "website": "https://www.cfb.state.nm.us",
        "address": "2905 Rodeo Park Dr E Bldg 4, Santa Fe, NM 87505",
        "city": "Santa Fe",
        "state": "NM",
        "virtualAvailable": False,
        "insuranceNotes": "No insurance required for state program services.",
        "costNotes": "Free for eligible New Mexico residents.",
        "referralRequired": False,
        "tags": ["state-agency", "clinical", "rehabilitation"],
        "sourceType": "state-agency",
    },
    # Second Sight – KY
    {
        "id": "ky-second-sight",
        "jurisdiction": "KY",
        "country": "US",
        "organizationName": "Second Sight – Center for the Visually Impaired (Louisville)",
        "serviceTypes": ["Vision Rehabilitation Therapy", "O&M Training", "Assistive Technology"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(502) 895-8550",
        "website": "https://secondsight.us",
        "address": "3926 Bardstown Rd, Louisville, KY 40218",
        "city": "Louisville",
        "state": "KY",
        "zip": "40218",
        "virtualAvailable": False,
        "insuranceNotes": "Some insurance accepted; sliding scale available.",
        "costNotes": "Sliding scale for qualifying individuals.",
        "referralRequired": False,
        "tags": ["nonprofit", "rehabilitation", "technology", "mobility"],
        "sourceType": "nonprofit",
    },
    # Community Services for the Blind – WA
    {
        "id": "wa-csb-seattle",
        "jurisdiction": "WA",
        "country": "US",
        "organizationName": "Lighthouse for the Blind – Seattle",
        "serviceTypes": ["Vision Rehabilitation Therapy", "Assistive Technology", "Employment Support"],
        "audienceTypes": ["Adult"],
        "phone": "(206) 322-4200",
        "website": "https://seattlelighthouse.org",
        "address": "2501 S Plum St, Seattle, WA 98144",
        "city": "Seattle",
        "state": "WA",
        "zip": "98144",
        "virtualAvailable": False,
        "insuranceNotes": "No insurance required for employment services.",
        "costNotes": "No charge for most services.",
        "referralRequired": False,
        "tags": ["nonprofit", "employment", "technology"],
        "sourceType": "nonprofit",
    },
    # National organization – APH
    {
        "id": "national-aph",
        "jurisdiction": "US",
        "country": "US",
        "organizationName": "American Printing House for the Blind (APH) – ConnectCenter",
        "serviceTypes": ["Assistive Technology", "School/TVI Services"],
        "audienceTypes": ["All Ages"],
        "phone": "(800) 223-1839",
        "website": "https://www.aph.org/connect-center/",
        "city": "Louisville",
        "state": "KY",
        "virtualAvailable": True,
        "insuranceNotes": "No insurance required.",
        "costNotes": "Resource hub; educational products at various price points.",
        "referralRequired": False,
        "availabilityNotes": "ConnectCenter links to directories of local agencies nationwide.",
        "tags": ["national", "school", "technology", "reading", "braille"],
        "sourceType": "nonprofit",
    },
    # AFB – national
    {
        "id": "national-afb",
        "jurisdiction": "US",
        "country": "US",
        "organizationName": "American Foundation for the Blind (AFB) – National",
        "serviceTypes": ["Assistive Technology", "Employment Support"],
        "audienceTypes": ["All Ages"],
        "phone": "(212) 502-7600",
        "website": "https://www.afb.org",
        "virtualAvailable": True,
        "insuranceNotes": "No insurance required.",
        "costNotes": "Free information, advocacy, and resource navigation.",
        "referralRequired": False,
        "availabilityNotes": "National advocacy and technical assistance; use CareerConnect for employment support.",
        "tags": ["national", "advocacy", "technology", "employment"],
        "sourceType": "nonprofit",
    },
    # Prevent Blindness – national
    {
        "id": "national-prevent-blindness",
        "jurisdiction": "US",
        "country": "US",
        "organizationName": "Prevent Blindness – National",
        "serviceTypes": ["Low Vision Clinic"],
        "audienceTypes": ["All Ages"],
        "phone": "(800) 331-2020",
        "website": "https://preventblindness.org",
        "virtualAvailable": True,
        "insuranceNotes": "No insurance required for navigation services.",
        "costNotes": "Free resource referral and low vision provider finder.",
        "referralRequired": False,
        "tags": ["national", "advocacy", "referral", "low-vision"],
        "sourceType": "nonprofit",
    },
    # VisionServe Alliance
    {
        "id": "national-visionserve",
        "jurisdiction": "US",
        "country": "US",
        "organizationName": "VisionServe Alliance – Member Agency Locator",
        "serviceTypes": ["Vision Rehabilitation Therapy", "O&M Training", "Assistive Technology", "Employment Support"],
        "audienceTypes": ["All Ages"],
        "phone": "(404) 325-3630",
        "website": "https://visionservealliance.org",
        "virtualAvailable": True,
        "insuranceNotes": "Varies by member agency.",
        "costNotes": "Use the member directory to find local agencies; services vary.",
        "referralRequired": False,
        "availabilityNotes": "Search member agencies by state at visionservealliance.org.",
        "tags": ["national", "rehabilitation", "network", "directory"],
        "sourceType": "nonprofit",
    },
    # Hadley
    {
        "id": "national-hadley",
        "jurisdiction": "US",
        "country": "US",
        "organizationName": "Hadley – Distance Education for Adults with Vision Loss",
        "serviceTypes": ["Assistive Technology", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(800) 323-4238",
        "website": "https://hadley.edu",
        "virtualAvailable": True,
        "insuranceNotes": "No insurance required.",
        "costNotes": "Free online and print courses for adults with vision loss.",
        "referralRequired": False,
        "availabilityNotes": "Fully virtual; courses available to anyone with vision loss in the US.",
        "tags": ["national", "education", "technology", "virtual", "free"],
        "sourceType": "nonprofit",
    },
    # Envision Inc. – KS
    {
        "id": "ks-envision",
        "jurisdiction": "KS",
        "country": "US",
        "organizationName": "Envision – Wichita",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy", "O&M Training", "Assistive Technology", "Employment Support"],
        "audienceTypes": ["All Ages"],
        "phone": "(316) 440-1600",
        "website": "https://www.envisionus.com",
        "address": "610 N Main St, Wichita, KS 67203",
        "city": "Wichita",
        "state": "KS",
        "zip": "67203",
        "virtualAvailable": True,
        "insuranceNotes": "Medicare and most insurance accepted for clinical services.",
        "costNotes": "Sliding scale available.",
        "referralRequired": False,
        "tags": ["nonprofit", "comprehensive", "rehabilitation", "employment", "low-vision"],
        "sourceType": "nonprofit",
    },
    # Cleveland Sight Center – OH (distinct from Cole Eye)
    {
        "id": "oh-cleveland-sight",
        "jurisdiction": "OH",
        "country": "US",
        "organizationName": "Cleveland Sight Center",
        "serviceTypes": ["Vision Rehabilitation Therapy", "O&M Training", "Assistive Technology", "Employment Support", "School/TVI Services"],
        "audienceTypes": ["All Ages"],
        "phone": "(216) 791-8118",
        "website": "https://clevelandsightcenter.org",
        "address": "1909 E 101st St, Cleveland, OH 44106",
        "city": "Cleveland",
        "state": "OH",
        "zip": "44106",
        "virtualAvailable": True,
        "insuranceNotes": "Most insurance accepted; sliding scale for uninsured.",
        "costNotes": "Sliding scale available.",
        "referralRequired": False,
        "tags": ["nonprofit", "rehabilitation", "school", "employment", "technology"],
        "sourceType": "nonprofit",
    },
    # Penney Eye Center – TX
    {
        "id": "tx-penney-eye",
        "jurisdiction": "TX",
        "country": "US",
        "organizationName": "J.C. Penney Low Vision Center – San Antonio",
        "serviceTypes": ["Low Vision Clinic"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(210) 614-3299",
        "website": "https://www.sfccares.com/low-vision-center",
        "address": "4647 Medical Dr, San Antonio, TX 78229",
        "city": "San Antonio",
        "state": "TX",
        "zip": "78229",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "reading"],
        "sourceType": "academic-medical-center",
    },
    # UT Southwestern – TX
    {
        "id": "tx-utsw-eye",
        "jurisdiction": "TX",
        "country": "US",
        "organizationName": "UT Southwestern Medical Center – Low Vision Clinic",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(214) 645-2020",
        "website": "https://utswmed.org/departments-clinics/ophthalmology/",
        "address": "5323 Harry Hines Blvd, Dallas, TX 75390",
        "city": "Dallas",
        "state": "TX",
        "zip": "75390",
        "virtualAvailable": False,
        "insuranceNotes": "Medicare and most insurance accepted.",
        "costNotes": "Standard clinical billing.",
        "referralRequired": True,
        "tags": ["clinical", "academic", "reading"],
        "sourceType": "academic-medical-center",
    },
    # Colorado Center for the Blind
    {
        "id": "co-ccb",
        "jurisdiction": "CO",
        "country": "US",
        "organizationName": "Colorado Center for the Blind – Littleton",
        "serviceTypes": ["Vision Rehabilitation Therapy", "O&M Training", "Assistive Technology"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(303) 778-1130",
        "website": "https://ccb.org",
        "address": "2233 W Shepperd Ave, Littleton, CO 80120",
        "city": "Littleton",
        "state": "CO",
        "zip": "80120",
        "virtualAvailable": False,
        "insuranceNotes": "Some insurance accepted; NFB-affiliated.",
        "costNotes": "Residential and day programs; financial assistance available.",
        "referralRequired": False,
        "tags": ["nonprofit", "rehabilitation", "residential", "mobility"],
        "sourceType": "nonprofit",
    },
    # Braille House – QC, Canada
    {
        "id": "qc-braille-house",
        "jurisdiction": "QC",
        "country": "CA",
        "organizationName": "CNIB Foundation – Quebec",
        "serviceTypes": ["Vision Rehabilitation Therapy", "O&M Training", "Assistive Technology"],
        "audienceTypes": ["All Ages"],
        "phone": "(800) 563-2642",
        "website": "https://www.cnib.ca",
        "city": "Montréal",
        "state": "QC",
        "virtualAvailable": True,
        "insuranceNotes": "RAMQ does not cover services; provincial REHALOSS may apply.",
        "costNotes": "Most services free for eligible residents.",
        "referralRequired": False,
        "tags": ["rehabilitation", "technology", "canada", "french"],
        "sourceType": "nonprofit",
    },
    # Vision Loss Rehab Canada – national
    {
        "id": "ca-vlrc-national",
        "jurisdiction": "CA",
        "country": "CA",
        "organizationName": "Vision Loss Rehabilitation Canada – National",
        "serviceTypes": ["Low Vision Clinic", "Vision Rehabilitation Therapy", "O&M Training", "Assistive Technology"],
        "audienceTypes": ["Adult", "Senior"],
        "phone": "(844) 887-8572",
        "website": "https://www.visionlossrehab.ca",
        "virtualAvailable": True,
        "insuranceNotes": "Services covered vary by province. Some AISH/ODSP funding available.",
        "costNotes": "Sliding scale; funded through CNIB network.",
        "referralRequired": True,
        "availabilityNotes": "Search by province at visionlossrehab.ca.",
        "tags": ["canada", "rehabilitation", "clinical", "national"],
        "sourceType": "nonprofit",
    },
]

# ── NPPES pull ─────────────────────────────────────────────────────────────────

ALL_STATES = [
    "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
    "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
    "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
    "VA","WA","WV","WI","WY","DC",
]

def fetch_nppes(states=ALL_STATES) -> list:
    all_entries = []
    seen_ids: set = set()
    print(f"Fetching NPPES for taxonomy 152WL0500X across {len(states)} states …")
    for state in states:
        results = nppes_get_all(state, taxonomy_desc="152WL0500X")
        added = 0
        for r in results:
            entry = nppes_to_resource(r, seen_ids)
            if entry:
                all_entries.append(entry)
                added += 1
        print(f"  {state}: {len(results)} raw → {added} entries")
        time.sleep(0.2)
    return all_entries

# ── TypeScript serialisation ───────────────────────────────────────────────────

def val_to_ts(v, indent=0) -> str:
    pad = "  " * indent
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    if v is None:
        return "undefined"
    if isinstance(v, str):
        escaped = v.replace("\\", "\\\\").replace("'", "\\'")
        return f"'{escaped}'"
    if isinstance(v, list):
        items = ", ".join(val_to_ts(i) for i in v)
        return f"[{items}]"
    if isinstance(v, dict):
        lines = ["{"]
        for k, dv in v.items():
            lines.append(f"{pad}  {k}: {val_to_ts(dv, indent+1)},")
        lines.append(f"{pad}}}")
        return "\n".join(lines)
    return f"'{v}'"

SKIP_KEYS = {"npi"}  # internal use only, not part of Resource type

def entry_to_ts(e: dict, indent: int = 2) -> str:
    pad = "  " * indent
    lines = [f"{pad}{{"]
    for k, v in e.items():
        if k in SKIP_KEYS:
            continue
        if v is None or v == "" or (isinstance(v, list) and len(v) == 0):
            continue
        lines.append(f"{pad}  {k}: {val_to_ts(v)},")
    lines.append(f"{pad}}},")
    return "\n".join(lines)

# ── main ───────────────────────────────────────────────────────────────────────

def main():
    out_path = Path("/home/user/lowvision-full-site/src/data/directorySeed_new.ts")

    # 1. VA BRCs
    va_entries = [make_va_brc(b) for b in VA_BRCS]
    print(f"VA BRCs: {len(va_entries)}")

    # 2. Missing state agencies
    agency_entries = [make_state_agency(a) for a in STATE_AGENCIES_MISSING]
    print(f"State agencies to add: {len(agency_entries)}")

    # 3. Curated extras
    print(f"Curated extras: {len(CURATED_EXTRA)}")

    # 4. NPPES
    nppes_entries = fetch_nppes()
    print(f"\nTotal NPPES entries: {len(nppes_entries)}")

    # Write TS file
    all_new = va_entries + agency_entries + CURATED_EXTRA + nppes_entries
    print(f"\nTotal new entries: {len(all_new)}")

    lines = [
        "import type { Resource } from '../types';",
        "",
        "// Auto-generated — DO NOT EDIT by hand.",
        "// Sources: CMS NPPES (taxonomy 152WL0500X), VA BRCs, state blind agencies, curated clinics.",
        "export const directorySeedDataNew: Resource[] = [",
    ]
    for e in all_new:
        lines.append(entry_to_ts(e))
    lines += ["];", ""]

    out_path.write_text("\n".join(lines))
    print(f"Written: {out_path}  ({len(all_new)} entries)")

if __name__ == "__main__":
    main()
