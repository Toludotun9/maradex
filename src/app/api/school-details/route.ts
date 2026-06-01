import { NextResponse } from 'next/server';

const SCHOOL_COSTS: Record<string, { inState: number; outOfState: number }> = {
  'HARVARD UNIVERSITY': { inState: 85200, outOfState: 85200 },
  'STANFORD UNIVERSITY': { inState: 78500, outOfState: 78500 },
  'COLUMBIA UNIVERSITY': { inState: 89000, outOfState: 89000 },
  'MASSACHUSETTS INSTITUTE OF TECHNOLOGY': { inState: 82000, outOfState: 82000 },
  'UNIVERSITY OF CALIFORNIA, BERKELEY': { inState: 44000, outOfState: 74000 },
  'OHIO UNIVERSITY': { inState: 31096, outOfState: 43184 },
  'OHIO UNIVERSITY - HERITAGE COLLEGE OF OSTEOPATHIC MEDICINE': { inState: 74736, outOfState: 98436 },
  'OHIO CHRISTIAN UNIVERSITY': { inState: 34000, outOfState: 34000 },
  'OHIO DOMINICAN UNIVERSITY': { inState: 45000, outOfState: 45000 },
  'OHIO NORTHERN UNIVERSITY': { inState: 52000, outOfState: 52000 },
  'THE OHIO STATE UNIVERSITY': { inState: 30120, outOfState: 54800 },
  'UNIVERSITY OF CINCINNATI': { inState: 29500, outOfState: 44800 },
  'UNIVERSITY OF TOLEDO': { inState: 28200, outOfState: 39500 },
  'MIAMI UNIVERSITY': { inState: 32100, outOfState: 52400 },
  'KENT STATE UNIVERSITY': { inState: 27800, outOfState: 38900 },
  'BOWLING GREEN STATE UNIVERSITY': { inState: 27500, outOfState: 38600 },
  'CASE WESTERN RESERVE UNIVERSITY': { inState: 81000, outOfState: 81000 },
  'WRIGHT STATE UNIVERSITY': { inState: 26500, outOfState: 37200 },
  'CLEVELAND STATE UNIVERSITY': { inState: 28000, outOfState: 39000 },
  'UNIVERSITY OF DAYTON': { inState: 68000, outOfState: 68000 },
  'XAVIER UNIVERSITY': { inState: 62000, outOfState: 62000 },
  'UNIVERSITY OF ALABAMA': { inState: 31000, outOfState: 53000 },
  'AUBURN UNIVERSITY': { inState: 32000, outOfState: 54000 },
  'UNIVERSITY OF ALABAMA AT BIRMINGHAM': { inState: 27000, outOfState: 41000 },
  'UNIVERSITY OF ALASKA ANCHORAGE': { inState: 24000, outOfState: 41000 },
  'UNIVERSITY OF ALASKA FAIRBANKS': { inState: 25000, outOfState: 42000 },
  'ARIZONA STATE UNIVERSITY': { inState: 30000, outOfState: 50000 },
  'UNIVERSITY OF ARIZONA': { inState: 31000, outOfState: 54000 },
  'NORTHERN ARIZONA UNIVERSITY': { inState: 29000, outOfState: 45000 },
  'UNIVERSITY OF ARKANSAS': { inState: 28000, outOfState: 46000 },
  'ARKANSAS STATE UNIVERSITY': { inState: 22000, outOfState: 31000 },
  'UNIVERSITY OF CALIFORNIA, LOS ANGELES': { inState: 38500, outOfState: 69500 },
  'UNIVERSITY OF SOUTHERN CALIFORNIA': { inState: 85000, outOfState: 85000 },
  'CALIFORNIA INSTITUTE OF TECHNOLOGY': { inState: 83000, outOfState: 83000 },
  'UNIVERSITY OF COLORADO BOULDER': { inState: 33000, outOfState: 58000 },
  'COLORADO STATE UNIVERSITY': { inState: 29000, outOfState: 50000 },
  'UNIVERSITY OF DENVER': { inState: 86039, outOfState: 86039 },
  'YALE UNIVERSITY': { inState: 87000, outOfState: 87000 },
  'UNIVERSITY OF CONNECTICUT': { inState: 34000, outOfState: 59000 },
  'WESLEYAN UNIVERSITY': { inState: 84000, outOfState: 84000 },
  'UNIVERSITY OF DELAWARE': { inState: 30000, outOfState: 55000 },
  'DELAWARE STATE UNIVERSITY': { inState: 23000, outOfState: 34000 },
  'UNIVERSITY OF FLORIDA': { inState: 22000, outOfState: 44000 },
  'FLORIDA STATE UNIVERSITY': { inState: 23000, outOfState: 40000 },
  'UNIVERSITY OF MIAMI': { inState: 78000, outOfState: 78000 },
  'UNIVERSITY OF SOUTH FLORIDA': { inState: 22000, outOfState: 39000 },
  'UNIVERSITY OF GEORGIA': { inState: 28000, outOfState: 49000 },
  'GEORGIA INSTITUTE OF TECHNOLOGY': { inState: 29000, outOfState: 51000 },
  'EMORY UNIVERSITY': { inState: 81000, outOfState: 81000 },
  'UNIVERSITY OF HAWAII AT MANOA': { inState: 31000, outOfState: 52000 },
  'UNIVERSITY OF IDAHO': { inState: 24000, outOfState: 43000 },
  'BOISE STATE UNIVERSITY': { inState: 25000, outOfState: 42000 },
  'UNIVERSITY OF ILLINOIS URBANA-CHAMPAIGN': { inState: 34000, outOfState: 57000 },
  'NORTHWESTERN UNIVERSITY': { inState: 88000, outOfState: 88000 },
  'UNIVERSITY OF CHICAGO': { inState: 89000, outOfState: 89000 },
  'INDIANA UNIVERSITY BLOOMINGTON': { inState: 28000, outOfState: 54000 },
  'PURDUE UNIVERSITY': { inState: 23000, outOfState: 42000 },
  'UNIVERSITY OF NOTRE DAME': { inState: 83000, outOfState: 83000 },
  'UNIVERSITY OF IOWA': { inState: 26000, outOfState: 48000 },
  'IOWA STATE UNIVERSITY': { inState: 23000, outOfState: 40000 },
  'UNIVERSITY OF KANSAS': { inState: 27000, outOfState: 45000 },
  'KANSAS STATE UNIVERSITY': { inState: 25000, outOfState: 41000 },
  'UNIVERSITY OF KENTUCKY': { inState: 30000, outOfState: 51000 },
  'UNIVERSITY OF LOUISVILLE': { inState: 28000, outOfState: 45000 },
  'LOUISIANA STATE UNIVERSITY': { inState: 29000, outOfState: 46000 },
  'TULANE UNIVERSITY': { inState: 83000, outOfState: 83000 },
  'UNIVERSITY OF MAINE': { inState: 26000, outOfState: 46000 },
  'BOWDOIN COLLEGE': { inState: 84000, outOfState: 84000 },
  'UNIVERSITY OF MARYLAND, COLLEGE PARK': { inState: 29000, outOfState: 55000 },
  'JOHNS HOPKINS UNIVERSITY': { inState: 84000, outOfState: 84000 },
  'BOSTON UNIVERSITY': { inState: 82000, outOfState: 82000 },
  'AMHERST COLLEGE': { inState: 85000, outOfState: 85000 },
  'UNIVERSITY OF MICHIGAN': { inState: 32000, outOfState: 72000 },
  'MICHIGAN STATE UNIVERSITY': { inState: 30000, outOfState: 54000 },
  'WAYNE STATE UNIVERSITY': { inState: 27000, outOfState: 42000 },
  'UNIVERSITY OF MINNESOTA': { inState: 30000, outOfState: 52000 },
  'UNIVERSITY OF MISSISSIPPI': { inState: 27000, outOfState: 45000 },
  'MISSISSIPPI STATE UNIVERSITY': { inState: 26000, outOfState: 43000 },
  'UNIVERSITY OF MISSOURI': { inState: 29000, outOfState: 48000 },
  'WASHINGTON UNIVERSITY IN ST. LOUIS': { inState: 83000, outOfState: 83000 },
  'UNIVERSITY OF MONTANA': { inState: 24000, outOfState: 44000 },
  'MONTANA STATE UNIVERSITY': { inState: 25000, outOfState: 45000 },
  'UNIVERSITY OF NEBRASKA-LINCOLN': { inState: 26000, outOfState: 44000 },
  'UNIVERSITY OF NEVADA, RENO': { inState: 25000, outOfState: 41000 },
  'UNIVERSITY OF NEVADA, LAS VEGAS': { inState: 25000, outOfState: 42000 },
  'DARTMOUTH COLLEGE': { inState: 86000, outOfState: 86000 },
  'UNIVERSITY OF NEW HAMPSHIRE': { inState: 33000, outOfState: 54000 },
  'PRINCETON UNIVERSITY': { inState: 81000, outOfState: 81000 },
  'RUTGERS UNIVERSITY': { inState: 33000, outOfState: 52000 },
  'UNIVERSITY OF NEW MEXICO': { inState: 24000, outOfState: 40000 },
  'NEW YORK UNIVERSITY': { inState: 85000, outOfState: 85000 },
  'CORNELL UNIVERSITY': { inState: 84000, outOfState: 84000 },
  'SYRACUSE UNIVERSITY': { inState: 80000, outOfState: 80000 },
  'UNIVERSITY OF NORTH CAROLINA AT CHAPEL HILL': { inState: 26000, outOfState: 56000 },
  'DUKE UNIVERSITY': { inState: 84000, outOfState: 84000 },
  'WAKE FOREST UNIVERSITY': { inState: 82000, outOfState: 82000 },
  'UNIVERSITY OF NORTH DAKOTA': { inState: 25000, outOfState: 38000 },
  'UNIVERSITY OF OKLAHOMA': { inState: 29000, outOfState: 46000 },
  'OKLAHOMA STATE UNIVERSITY': { inState: 26000, outOfState: 42000 },
  'UNIVERSITY OF OREGON': { inState: 30000, outOfState: 58000 },
  'OREGON STATE UNIVERSITY': { inState: 29000, outOfState: 50000 },
  'UNIVERSITY OF PENNSYLVANIA': { inState: 85000, outOfState: 85000 },
  'PENNSYLVANIA STATE UNIVERSITY': { inState: 35000, outOfState: 56000 },
  'CARNEGIE MELLON UNIVERSITY': { inState: 90070, outOfState: 90070 },
  'TEMPLE UNIVERSITY': { inState: 33000, outOfState: 51000 },
  'BROWN UNIVERSITY': { inState: 85000, outOfState: 85000 },
  'UNIVERSITY OF RHODE ISLAND': { inState: 31000, outOfState: 51000 },
  'UNIVERSITY OF SOUTH CAROLINA': { inState: 29000, outOfState: 51000 },
  'CLEMSON UNIVERSITY': { inState: 31000, outOfState: 54000 },
  'UNIVERSITY OF SOUTH DAKOTA': { inState: 23000, outOfState: 32000 },
  'VANDERBILT UNIVERSITY': { inState: 84000, outOfState: 84000 },
  'UNIVERSITY OF TENNESSEE': { inState: 29000, outOfState: 49000 },
  'UNIVERSITY OF TEXAS AT AUSTIN': { inState: 30000, outOfState: 60000 },
  'TEXAS A&M UNIVERSITY': { inState: 30000, outOfState: 58000 },
  'RICE UNIVERSITY': { inState: 74000, outOfState: 74000 },
  'UNIVERSITY OF UTAH': { inState: 25000, outOfState: 46000 },
  'BRIGHAM YOUNG UNIVERSITY': { inState: 25000, outOfState: 25000 },
  'UNIVERSITY OF VERMONT': { inState: 35000, outOfState: 61000 },
  'UNIVERSITY OF VIRGINIA': { inState: 36000, outOfState: 72000 },
  'VIRGINIA TECH': { inState: 30000, outOfState: 52000 },
  'COLLEGE OF WILLIAM & MARY': { inState: 38000, outOfState: 64000 },
  'UNIVERSITY OF WASHINGTON': { inState: 30000, outOfState: 60000 },
  'WASHINGTON STATE UNIVERSITY': { inState: 28000, outOfState: 45000 },
  'WEST VIRGINIA UNIVERSITY': { inState: 25000, outOfState: 43000 },
  'UNIVERSITY OF WISCONSIN-MADISON': { inState: 28000, outOfState: 56000 },
  'UNIVERSITY OF WYOMING': { inState: 21000, outOfState: 35000 },
};

const STATE_AVERAGES: Record<string, { inStatePublic: number; outOfStatePublic: number; privateCost: number }> = {
  'AL': { inStatePublic: 28500, outOfStatePublic: 49000, privateCost: 62000 },
  'AK': { inStatePublic: 25000, outOfStatePublic: 42000, privateCost: 55000 },
  'AZ': { inStatePublic: 30000, outOfStatePublic: 52000, privateCost: 64000 },
  'AR': { inStatePublic: 26000, outOfStatePublic: 43000, privateCost: 58000 },
  'CA': { inStatePublic: 36000, outOfStatePublic: 66000, privateCost: 82000 },
  'CO': { inStatePublic: 31000, outOfStatePublic: 54000, privateCost: 75000 },
  'CT': { inStatePublic: 33000, outOfStatePublic: 58000, privateCost: 84000 },
  'DE': { inStatePublic: 29000, outOfStatePublic: 52000, privateCost: 65000 },
  'FL': { inStatePublic: 22000, outOfStatePublic: 41000, privateCost: 72000 },
  'GA': { inStatePublic: 27500, outOfStatePublic: 48000, privateCost: 78000 },
  'HI': { inStatePublic: 31000, outOfStatePublic: 52000, privateCost: 65000 },
  'ID': { inStatePublic: 24500, outOfStatePublic: 42500, privateCost: 55000 },
  'IL': { inStatePublic: 33000, outOfStatePublic: 55000, privateCost: 85000 },
  'IN': { inStatePublic: 26000, outOfStatePublic: 49000, privateCost: 79000 },
  'IA': { inStatePublic: 25000, outOfStatePublic: 46000, privateCost: 72000 },
  'KS': { inStatePublic: 26000, outOfStatePublic: 43000, privateCost: 64000 },
  'KY': { inStatePublic: 29000, outOfStatePublic: 48000, privateCost: 62000 },
  'LA': { inStatePublic: 28500, outOfStatePublic: 45000, privateCost: 78000 },
  'ME': { inStatePublic: 26000, outOfStatePublic: 46000, privateCost: 81000 },
  'MD': { inStatePublic: 28500, outOfStatePublic: 52000, privateCost: 82000 },
  'MA': { inStatePublic: 32000, outOfStatePublic: 56000, privateCost: 85000 },
  'MI': { inStatePublic: 29500, outOfStatePublic: 55000, privateCost: 68000 },
  'MN': { inStatePublic: 29000, outOfStatePublic: 49000, privateCost: 74000 },
  'MS': { inStatePublic: 26500, outOfStatePublic: 44000, privateCost: 58000 },
  'MO': { inStatePublic: 28000, outOfStatePublic: 47000, privateCost: 76000 },
  'MT': { inStatePublic: 24500, outOfStatePublic: 44500, privateCost: 55000 },
  'NE': { inStatePublic: 26000, outOfStatePublic: 44000, privateCost: 62000 },
  'NV': { inStatePublic: 25000, outOfStatePublic: 41500, privateCost: 60000 },
  'NH': { inStatePublic: 33000, outOfStatePublic: 54000, privateCost: 84000 },
  'NJ': { inStatePublic: 33000, outOfStatePublic: 52000, privateCost: 79000 },
  'NM': { inStatePublic: 24000, outOfStatePublic: 40000, privateCost: 55000 },
  'NY': { inStatePublic: 29000, outOfStatePublic: 49000, privateCost: 82000 },
  'NC': { inStatePublic: 25500, outOfStatePublic: 53000, privateCost: 76000 },
  'ND': { inStatePublic: 25000, outOfStatePublic: 38000, privateCost: 55000 },
  'OH': { inStatePublic: 29500, outOfStatePublic: 48000, privateCost: 65000 },
  'OK': { inStatePublic: 27500, outOfStatePublic: 44000, privateCost: 58000 },
  'OR': { inStatePublic: 29500, outOfStatePublic: 54000, privateCost: 74000 },
  'PA': { inStatePublic: 34000, outOfStatePublic: 53000, privateCost: 79000 },
  'RI': { inStatePublic: 31000, outOfStatePublic: 51000, privateCost: 83000 },
  'SC': { inStatePublic: 30000, outOfStatePublic: 52500, privateCost: 65000 },
  'SD': { inStatePublic: 23000, outOfStatePublic: 32000, privateCost: 55000 },
  'TN': { inStatePublic: 28500, outOfStatePublic: 48000, privateCost: 78000 },
  'TX': { inStatePublic: 29500, outOfStatePublic: 57000, privateCost: 72000 },
  'UT': { inStatePublic: 25000, outOfStatePublic: 45000, privateCost: 60000 },
  'VT': { inStatePublic: 35000, outOfStatePublic: 61000, privateCost: 81000 },
  'VA': { inStatePublic: 32000, outOfStatePublic: 59000, privateCost: 76000 },
  'WA': { inStatePublic: 29000, outOfStatePublic: 53500, privateCost: 78000 },
  'WV': { inStatePublic: 25000, outOfStatePublic: 43000, privateCost: 58000 },
  'WI': { inStatePublic: 28000, outOfStatePublic: 56000, privateCost: 71000 },
  'WY': { inStatePublic: 21000, outOfStatePublic: 35000, privateCost: 52000 }
};

const COST_CACHE = new Map<string, { inState: number; outOfState: number }>();

async function fetchCollegeScorecardCost(schoolName: string, stateCode: string): Promise<{ inState: number; outOfState: number } | null> {
  const cleanName = schoolName.split(',')[0].trim();
  if (!cleanName) return null;

  const cacheKey = `${cleanName.toUpperCase()}_${stateCode.toUpperCase()}`;
  if (COST_CACHE.has(cacheKey)) {
    return COST_CACHE.get(cacheKey) || null;
  }

  try {
    const encodedName = encodeURIComponent(cleanName);
    let url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=DEMO_KEY&school.name=${encodedName}&fields=school.name,latest.cost.attendance.academic_year,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state&per_page=5`;
    if (stateCode) {
      url += `&school.state=${stateCode.toUpperCase()}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const match = data.results.find((r: any) => r['school.name']?.toUpperCase() === cleanName.toUpperCase()) || data.results[0];
      
      const coa = match['latest.cost.attendance.academic_year'];
      const tuitionIn = match['latest.cost.tuition.in_state'];
      const tuitionOut = match['latest.cost.tuition.out_of_state'];

      const inState = coa || (tuitionIn ? tuitionIn + 18000 : null);
      const outOfState = coa 
        ? (tuitionOut && tuitionIn ? coa + (tuitionOut - tuitionIn) : coa) 
        : (tuitionOut ? tuitionOut + 18000 : null);

      if (inState || outOfState) {
        const result = {
          inState: inState || 35000,
          outOfState: outOfState || inState || 35000
        };
        COST_CACHE.set(cacheKey, result);
        return result;
      }
    }
    return null;
  } catch (e) {
    console.error('Error fetching from College Scorecard API:', e);
    return null;
  }
}

function normalizeName(name: string): string {
  return name
    .toUpperCase()
    .replace(/^THE\s+/, '')
    .replace(/[^A-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isPublicSchool(schoolName: string): boolean {
  const upper = schoolName.toUpperCase();
  
  // Private universities/colleges that contain public keywords but should be private
  const privateExceptions = [
    'UNIVERSITY OF MIAMI',
    'UNIVERSITY OF DAYTON',
    'UNIVERSITY OF NOTRE DAME',
    'UNIVERSITY OF DENVER',
    'UNIVERSITY OF SAN FRANCISCO',
    'UNIVERSITY OF SAN DIEGO',
    'UNIVERSITY OF ROCHESTER',
    'UNIVERSITY OF TULSA',
    'UNIVERSITY OF PUGET SOUND',
    'UNIVERSITY OF REDLANDS',
    'UNIVERSITY OF PORTLAND',
    'UNIVERSITY OF ST. THOMAS',
    'COLLEGE OF THE HOLY CROSS',
    'COLLEGE OF ST. SCHOLASTICA',
    'COLLEGE OF ST. BENEDICT',
    'UNIVERSITY OF SOUTHERN CALIFORNIA'
  ];

  if (privateExceptions.some(ex => upper.includes(ex))) {
    return false;
  }

  const publicKeywords = [
    'STATE', 'COMMUNITY', 'SYSTEM', 'COUNTY', 'CITY', 'TOWNSHIP',
    'PUBLIC', 'MUNICIPAL', 'DISTRICT', 'VOCATIONAL', 'TECHNICAL'
  ];
  if (publicKeywords.some(keyword => upper.includes(keyword))) {
    return true;
  }
  if (upper.includes('UNIVERSITY OF ') || upper.startsWith('COLLEGE OF ')) {
    return true;
  }
  return false;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const schoolNameParam = searchParams.get('school') || '';
  const programType = searchParams.get('program') || 'undergrad';
  const degreeType = searchParams.get('degree') || '';
  const studentState = searchParams.get('studentState')?.trim().toUpperCase() || '';
  const academicPeriod = searchParams.get('academicPeriod') || '';
  
  // Clean up school name for display
  const cleanSchoolName = schoolNameParam ? schoolNameParam.split(',')[0].toUpperCase() : 'YOUR SCHOOL';
  const upperSchool = cleanSchoolName.toUpperCase();

  // Extract school state
  const schoolParts = schoolNameParam.split(',');
  const schoolState = schoolParts.length > 2 ? schoolParts[2].trim().toUpperCase() : '';

  const isInState = schoolState && studentState && schoolState === studentState;

  // 1. Determine tailored Cost of Attendance
  let costOfAttendance = 35062; // default matching the exact prompt screenshot
  let isCostMapped = false;
  
  // Find in SCHOOL_COSTS (sorted by length descending to prevent prefix/substring collisions)
  const normalizedInput = normalizeName(upperSchool);
  const match = Object.keys(SCHOOL_COSTS)
    .sort((a, b) => b.length - a.length)
    .find(key => {
      const normalizedKey = normalizeName(key);
      return normalizedInput.includes(normalizedKey) || normalizedKey.includes(normalizedInput);
    });
  if (match) {
    const costs = SCHOOL_COSTS[match];
    costOfAttendance = isInState ? costs.inState : costs.outOfState;
    isCostMapped = true;
  }

  if (!isCostMapped) {
    if (schoolNameParam) {
      // Try to query the College Scorecard API dynamically
      const dynamicCost = await fetchCollegeScorecardCost(cleanSchoolName, schoolState);
      if (dynamicCost) {
        costOfAttendance = isInState ? dynamicCost.inState : dynamicCost.outOfState;
        isCostMapped = true;
      } else {
        // Fall back to clean state average costs without random hash offsets
        const stateKey = schoolState || 'US';
        const averages = STATE_AVERAGES[stateKey] || { inStatePublic: 28000, outOfStatePublic: 48000, privateCost: 65000 };
        
        const isPublic = isPublicSchool(upperSchool);
        costOfAttendance = isPublic 
          ? (isInState ? averages.inStatePublic : averages.outOfStatePublic)
          : averages.privateCost;
        isCostMapped = true;
      }
    }
  }

  // 2. Generate dynamic Academic Periods
  const getTermDates = (year: number) => {
    const getNthWeekday = (y: number, month: number, dayOfWeek: number, n: number) => {
      let count = 0;
      const date = new Date(y, month, 1);
      while (date.getMonth() === month) {
        if (date.getDay() === dayOfWeek) {
          count++;
          if (count === n) {
            return date;
          }
        }
        date.setDate(date.getDate() + 1);
      }
      return new Date(y, month, 1);
    };

    const format = (d: Date) => {
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const yyyy = d.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    };

    const springStart = getNthWeekday(year, 0, 1, 2);
    const springEnd = getNthWeekday(year, 4, 6, 1);

    const summerStart = getNthWeekday(year, 4, 1, 2);
    const summerEnd = new Date(summerStart);
    summerEnd.setDate(summerEnd.getDate() + 13 * 7 + 5);

    const fallStart = getNthWeekday(year, 7, 1, 4);
    const fallEnd = getNthWeekday(year, 11, 6, 2);

    return {
      springStart: format(springStart),
      springEnd: format(springEnd),
      summerStart: format(summerStart),
      summerEnd: format(summerEnd),
      fallStart: format(fallStart),
      fallEnd: format(fallEnd),
    };
  };

  const currentYear = new Date().getFullYear();
  const prevYear = currentYear - 1;
  const nextYear = currentYear + 1;

  const termsPrev = getTermDates(prevYear);
  const termsCurrent = getTermDates(currentYear);
  const termsNext = getTermDates(nextYear);

  const academicPeriods = [
    { label: `Spring Only ${currentYear}: ${termsCurrent.springStart} - ${termsCurrent.springEnd}`, value: `spring_only_${currentYear}` },
    { label: `Summer Only ${currentYear}: ${termsCurrent.summerStart} - ${termsCurrent.summerEnd}`, value: `summer_only_${currentYear}` },
    { label: `Summer, Fall and Spring ${currentYear}-${nextYear}: ${termsCurrent.summerStart} - ${termsNext.springEnd}`, value: `summer_fall_spring_${currentYear}_${nextYear}` },
    { label: `Fall and Spring ${currentYear}-${nextYear}: ${termsCurrent.fallStart} - ${termsNext.springEnd}`, value: `fall_spring_${currentYear}_${nextYear}` },
    { label: `Summer and Fall ${currentYear}: ${termsCurrent.summerStart} - ${termsCurrent.fallEnd}`, value: `summer_fall_${currentYear}` },
    { label: `Fall and Spring ${prevYear}-${currentYear}: ${termsPrev.fallStart} - ${termsCurrent.springEnd}`, value: `fall_spring_${prevYear}_${currentYear}` },
    { label: `Fall Only ${currentYear}: ${termsCurrent.fallStart} - ${termsCurrent.fallEnd}`, value: `fall_only_${currentYear}` },
    { label: `Fall ${prevYear}: ${termsPrev.fallStart} - ${termsPrev.fallEnd}`, value: `fall_${prevYear}` },
    { label: `Summer ${prevYear}: ${termsPrev.summerStart} - ${termsPrev.summerEnd}`, value: `summer_${prevYear}` },
    { label: `Summer and Fall ${prevYear}: ${termsPrev.summerStart} - ${termsPrev.fallEnd}`, value: `summer_fall_${prevYear}` },
    { label: `Summer, Fall and Spring ${prevYear}-${currentYear}: ${termsPrev.summerStart} - ${termsCurrent.springEnd}`, value: `summer_fall_spring_${prevYear}_${currentYear}` },
    { label: 'Custom academic loan period', value: 'custom' }
  ];

  // 3. Generate robust Fields of Study matching the curriculum offered by the school
  let fieldsOfStudy: { label: string; value: string }[] = [];

  if (programType === 'bar') {
    fieldsOfStudy = [
      { label: 'Bar Study Exam Preparation', value: 'bar-exam' },
      { label: 'Advanced Legal Certifications', value: 'legal-cert' }
    ];
  } else if (programType === 'residency') {
    if (degreeType === 'medical') {
      fieldsOfStudy = [
        { label: 'MD - Anesthesiology', value: 'anesthesiology' },
        { label: 'MD - Dermatology', value: 'dermatology' },
        { label: 'MD - Dermatopathology', value: 'dermatopathology' },
        { label: 'MD - Emergency Medicine', value: 'emergency' },
        { label: 'MD - Family Medicine', value: 'family' },
        { label: 'MD - Internal Medicine', value: 'internal' },
        { label: 'MD - Neurology', value: 'neurology' },
        { label: 'MD - Obstetrics & Gynecology', value: 'obgyn' },
        { label: 'MD - Pediatrics', value: 'pediatrics' },
        { label: 'MD - Psychiatry', value: 'psychiatry' },
        { label: 'MD - Surgery (General)', value: 'surgery' }
      ];
    } else {
      fieldsOfStudy = [
        { label: 'DDS/DMD - Endodontics', value: 'endodontics' },
        { label: 'DDS/DMD - Oral & Maxillofacial Surgery', value: 'oral-surgery' },
        { label: 'DDS/DMD - Orthodontics', value: 'orthodontics' },
        { label: 'DDS/DMD - Pediatric Dentistry', value: 'pediatric-dental' },
        { label: 'DDS/DMD - Periodontics', value: 'periodontics' }
      ];
    }
  } else if (programType === 'grad') {
    fieldsOfStudy = [
      { label: 'Master of Business Administration (MBA)', value: 'mba' },
      { label: 'Master of Science in Computer Science (MSCS)', value: 'mscs' },
      { label: 'Master of Science in Data Science', value: 'msds' },
      { label: 'Master of Arts in Economics', value: 'maecon' },
      { label: 'Master of Public Health (MPH)', value: 'mph' },
      { label: 'Juris Doctor (JD)', value: 'jd' },
      { label: 'Doctor of Philosophy (PhD)', value: 'phd' },
      { label: 'Master of Engineering (MEng)', value: 'meng' },
      { label: 'Master of Fine Arts (MFA)', value: 'mfa' },
      { label: 'Other Graduate Program', value: 'other-grad' }
    ];
  } else {
    // Undergrad standard programs matching the exact screenshot requirements
    fieldsOfStudy = [
      { label: 'Undeclared', value: 'undeclared' },
      { label: 'Agriculture & Natural Resources', value: 'agriculture' },
      { label: 'Architecture, Planning & Preservation', value: 'architecture' },
      { label: 'Arts, Media & Film', value: 'arts' },
      { label: 'Aviation & Airline Programs', value: 'aviation' },
      { label: 'Behavioral & Social Sciences/Public Policy', value: 'behavioral-sciences' },
      { label: 'Biology, Chemistry, Science', value: 'biology-chemistry-science' },
      { label: 'Boot Camp Training/Coding', value: 'bootcamp' },
      { label: 'Business & Financial', value: 'business-financial' },
      { label: 'Computer & Information Sciences', value: 'computer-sciences' },
      { label: 'Cosmetology/Barbering', value: 'cosmetology' },
      { label: 'Criminal Justice', value: 'criminal-justice' },
      { label: 'Culinary & Food Sciences', value: 'culinary' },
      { label: 'Dental Studies', value: 'dental' },
      { label: 'Education', value: 'education' },
      { label: 'Engineering', value: 'engineering' },
      { label: 'Intelligence & Homeland Security', value: 'intelligence-security' },
      { label: 'Law Studies', value: 'law' },
      { label: 'Liberal Arts, Gen Studies & Humanities', value: 'liberal-arts' },
      { label: 'Mathematics', value: 'mathematics' },
      { label: 'Medical Studies', value: 'medical-studies' },
      { label: 'Nursing Studies', value: 'nursing-studies' },
      { label: 'Pharmacy & Pharmacy Tech', value: 'pharmacy' },
      { label: 'Psychology, Social Work & Counseling', value: 'psychology-counseling' },
      { label: 'Public Safety/Public Services', value: 'public-safety' },
      { label: 'Sports Management/Sports Medicine', value: 'sports-management' },
      { label: 'Trades/Technical/Career Training', value: 'trades' },
      { label: 'Veterinary Studies', value: 'veterinary' },
      { label: 'Web, Software, Game Dev/Design', value: 'web-software-game' },
      { label: 'Continuing Education', value: 'continuing-education' }
    ];
  }

  // Simulate a highly responsive production network delay
  await new Promise(resolve => setTimeout(resolve, 400));

  const isSingle = academicPeriod && (
    academicPeriod.toLowerCase().includes('only') || 
    academicPeriod.toLowerCase() === 'custom' || 
    (academicPeriod.toLowerCase().includes('spring') && !academicPeriod.toLowerCase().includes('fall') && !academicPeriod.toLowerCase().includes('summer')) ||
    (academicPeriod.toLowerCase().includes('fall') && !academicPeriod.toLowerCase().includes('spring') && !academicPeriod.toLowerCase().includes('summer')) ||
    (academicPeriod.toLowerCase().includes('summer') && !academicPeriod.toLowerCase().includes('spring') && !academicPeriod.toLowerCase().includes('fall'))
  );

  const costPeriodDescriptionSuffix = isSingle 
    ? `, but your cost may be different because you selected a period that is less than the school year. You can use this estimate to help you determine the cost of attendance for your loan period or enter your own amount.`
    : `. You can use this estimate or enter your own amount.`;

  const descriptionText = `The estimated ${isInState ? 'in-state' : 'out-of-state'} cost of attendance for ${programType === 'undergrad' ? 'undergrad' : 'grad'} students enrolled full time at ${cleanSchoolName} is $${costOfAttendance.toLocaleString()}, and includes tuition, fees, housing, meals, books, and supplies${costPeriodDescriptionSuffix}`;

  return NextResponse.json({
    schoolName: cleanSchoolName,
    costOfAttendance,
    academicPeriods,
    fieldsOfStudy,
    costDetails: {
      formattedEstimate: `$${costOfAttendance.toLocaleString()}`,
      description: descriptionText
    }
  });
}
