import { Hotspot, CoolingProject, InterventionOption, ObservationReport, PlainVulnerabilityCause } from '../types';

export const MOCK_HOTSPOTS: Hotspot[] = [
  {
    id: 'hs-tnagar',
    name: 'T. Nagar (Panagal Park & Commercial Hub)',
    nameTa: 'தி. நகர் (பனகல் பூங்கா & வணிக மையம்)',
    zone: 'Zone 10 (Kodambakkam)',
    zoneTa: 'மண்டலம் 10 (கோடம்பாக்கம்)',
    wardNumber: 136,
    riskScore: 88,
    riskLevel: 'high',
    ambientTempC: 39.2,
    feelsLikeC: 44.8,
    summaryReason: 'Low vegetation · High paved surface · Dense market transit',
    summaryReasonTa: 'குறைந்த பசுமை · அதிக நடைபாதை தளம் · அடர்ந்த சந்தை போக்குவரத்து',
    coordinates: {
      lat: 13.0418,
      lng: 80.2341,
      svgX: 250,
      svgY: 310,
    },
    populationDensityPerSqKm: 28400,
    diagnosis: {
      vegetationDeficit: -46,
      builtUpDensity: 89,
      pavedSurface: 84,
      humanExposureIndex: 94,
      albedo: 0.12,
      canopyCoverPercent: 5.2,
    },
    sensitiveFacilities: [
      { name: 'GCC Corporation Higher Secondary School', nameTa: 'மாநகராட்சி மேல்நிலைப் பள்ளி', type: 'school', distanceMeters: 180 },
      { name: 'T. Nagar Urban Primary Health Centre', nameTa: 'நகர்ப்புற ஆரம்ப சுகாதார நிலையம்', type: 'hospital', distanceMeters: 320 },
      { name: 'Pondy Bazaar Pedestrian Plaza & Bus Stand', nameTa: 'பாண்டி பஜார் நடைபாதை அரங்கம்', type: 'transit', distanceMeters: 90 },
      { name: 'Usman Road Wholesale Market Corridor', nameTa: 'உஸ்மான் சாலை மொத்த விற்பனை சந்தை', type: 'market', distanceMeters: 150 },
    ],
    recommendedInterventions: [
      'Sidewalk native shade tree canopy (Neem, Pungan)',
      'High-albedo solar-reflective cool roofs on civic buildings',
      'Modular tensile shade canopies with misting at transit hubs'
    ],
    recommendedInterventionsTa: [
      'நடைபாதை நிழல் மரங்கள் (வேம்பு, புங்கன்)',
      'பொதுக் கட்டடங்களில் அதிக சூரிய-பிரதிபலிப்பு குளிர் கூரைகள்',
      'பேருந்து நிறுத்தங்களில் நிழல் கூடாரங்கள் மற்றும் மூடுபனி அமைப்பு'
    ],
    nearestProjectId: 'proj-047',
  },
  {
    id: 'hs-annanagar',
    name: 'Anna Nagar (Second Avenue & Roundtana)',
    nameTa: 'அண்ணா நகர் (இரண்டாவது அவென்யூ & ரவுண்டானா)',
    zone: 'Zone 08 (Anna Nagar)',
    zoneTa: 'மண்டலம் 08 (அண்ணா நகர்)',
    wardNumber: 102,
    riskScore: 84,
    riskLevel: 'high',
    ambientTempC: 38.6,
    feelsLikeC: 43.4,
    summaryReason: 'Low canopy retention along avenues · High vehicular heat',
    summaryReasonTa: 'சாலையோர மரக்குறைவு · அதிக வாகன வெப்ப உமிழ்வு',
    coordinates: {
      lat: 13.0850,
      lng: 80.2101,
      svgX: 180,
      svgY: 190,
    },
    populationDensityPerSqKm: 21600,
    diagnosis: {
      vegetationDeficit: -38,
      builtUpDensity: 82,
      pavedSurface: 86,
      humanExposureIndex: 82,
      albedo: 0.14,
      canopyCoverPercent: 7.8,
    },
    sensitiveFacilities: [
      { name: 'Anna Nagar Government Peripheral Hospital', nameTa: 'அண்ணா நகர் அரசு புறநகர் மருத்துவமனை', type: 'hospital', distanceMeters: 410 },
      { name: 'Kandhasamy Naidu College & School Campus', nameTa: 'கந்தசாமி நாயுடு கல்லூரி வளாகம்', type: 'school', distanceMeters: 250 },
      { name: 'Anna Nagar Roundtana Metro Interchange', nameTa: 'ரவுண்டானா மெட்ரோ ரயில் நிலையம்', type: 'transit', distanceMeters: 110 },
    ],
    recommendedInterventions: [
      'Avenue gap planting with deep-root native species',
      'School rooftop cool coatings & vertical green screens',
      'Shaded pedestrian resting nodes along 2nd Avenue'
    ],
    recommendedInterventionsTa: [
      'வழியோர மர இடைவெளிகளை நிரப்பும் மரம் நடுதல்',
      'பள்ளி கூரைகளில் குளிர் பூச்சு மற்றும் செங்குத்து பசுமை திரை',
      'நடைபயிற்சி பாதைகளில் நிழல் ஓய்வு தளங்கள்'
    ],
    nearestProjectId: 'proj-031',
  },
  {
    id: 'hs-georgetown',
    name: 'George Town & Broadway (North Chennai Core)',
    nameTa: 'ஜார்ஜ் டவுன் & பிராட்வே (வட சென்னை மையம்)',
    zone: 'Zone 05 (Royapuram)',
    zoneTa: 'மண்டலம் 05 (ராயபுரம்)',
    wardNumber: 56,
    riskScore: 92,
    riskLevel: 'very_high',
    ambientTempC: 40.1,
    feelsLikeC: 46.2,
    summaryReason: 'Extreme built density · <2% canopy · Heavy trapped surface heat',
    summaryReasonTa: 'மிக அதிக கட்டட அடர்த்தி · 2%க்கும் குறைவான மரங்கள் · சிக்கிய வெப்பம்',
    coordinates: {
      lat: 13.0900,
      lng: 80.2850,
      svgX: 370,
      svgY: 140,
    },
    populationDensityPerSqKm: 39500,
    diagnosis: {
      vegetationDeficit: -62,
      builtUpDensity: 96,
      pavedSurface: 93,
      humanExposureIndex: 98,
      albedo: 0.11,
      canopyCoverPercent: 1.8,
    },
    sensitiveFacilities: [
      { name: 'Rajiv Gandhi Government General Hospital (RGGGH)', nameTa: 'ராஜீவ் காந்தி அரசு பொது மருத்துவமனை', type: 'hospital', distanceMeters: 450 },
      { name: 'Broadway Central Bus Terminus', nameTa: 'பிராட்வே மத்திய பேருந்து நிலையம்', type: 'transit', distanceMeters: 80 },
      { name: 'Kothawal Chavadi Community Markets', nameTa: 'கொத்தவால் சாவடி சமூக சந்தை', type: 'market', distanceMeters: 120 },
    ],
    recommendedInterventions: [
      'Dense micro-Miyawaki clusters in vacant civic pockets',
      'Extensive cool-roof white membrane program for commercial tenements',
      'High-capacity shaded transit corridors with drinking water mist stations'
    ],
    recommendedInterventionsTa: [
      'காலியிடங்களில் மியாவாக்கி குறுங்காடுகள்',
      'வணிக குடியிருப்புகளுக்கான சூரிய-பிரதிபலிப்பு குளிர் கூரை திட்டம்',
      'குடிநீர் மற்றும் மூடுபனியுடன் கூடிய நிழல் பேருந்து நடைபாதைகள்'
    ],
    nearestProjectId: 'proj-052',
  },
  {
    id: 'hs-guindy',
    name: 'Guindy Industrial Estate & Multimodal Hub',
    nameTa: 'கிண்டி தொழிற்பேட்டை & போக்குவரத்து மையம்',
    zone: 'Zone 13 (Adyar - Guindy Border)',
    zoneTa: 'மண்டலம் 13 (அடையாறு எல்லை)',
    wardNumber: 170,
    riskScore: 86,
    riskLevel: 'high',
    ambientTempC: 39.4,
    feelsLikeC: 44.1,
    summaryReason: 'Corrugated sheet roofing · Asphalt yard heat · Intense commuter surge',
    summaryReasonTa: 'தகரக் கூரைகள் · தார் தளம் · ஆயிரக்கணக்கான பயணிகள் திரட்சி',
    coordinates: {
      lat: 13.0067,
      lng: 80.2026,
      svgX: 200,
      svgY: 420,
    },
    populationDensityPerSqKm: 18200,
    diagnosis: {
      vegetationDeficit: -40,
      builtUpDensity: 84,
      pavedSurface: 88,
      humanExposureIndex: 89,
      albedo: 0.13,
      canopyCoverPercent: 6.1,
    },
    sensitiveFacilities: [
      { name: 'Guindy Railway & Metro Transit Exchange', nameTa: 'கிண்டி ரயில் மற்றும் மெட்ரோ பரிமாற்ற நிலையம்', type: 'transit', distanceMeters: 60 },
      { name: 'SIDCO Industrial Labor Clinic', nameTa: 'சிட்கோ தொழிலாளர் மருந்தகம்', type: 'hospital', distanceMeters: 290 },
      { name: 'Technical Training Institute', nameTa: 'தொழில்நுட்ப பயிற்சி நிறுவனம்', type: 'school', distanceMeters: 380 },
    ],
    recommendedInterventions: [
      'Thermal reflective coatings over factory and shed tin roofs',
      'Buffer green belt along railway transit edge',
      'Solar-powered misting gazebos at bus bay waiting areas'
    ],
    recommendedInterventionsTa: [
      'தொழிற்சாலை தகரக் கூரைகளில் வெப்பப் பிரதிபலிப்பு பூச்சு',
      'ரயில்வே பாதையோரம் பசுமை பாதுகாப்பு சுவர்',
      'பேருந்து காத்திருப்பு பகுதியில் சூரியசக்தி மூடுபனி நிழற்குடைகள்'
    ],
    nearestProjectId: 'proj-019',
  },
  {
    id: 'hs-kodambakkam',
    name: 'Kodambakkam & Vadapalani Junction',
    nameTa: 'கோடம்பாக்கம் & வடபழனி சந்திப்பு',
    zone: 'Zone 10 (Kodambakkam)',
    zoneTa: 'மண்டலம் 10 (கோடம்பாக்கம்)',
    wardNumber: 131,
    riskScore: 82,
    riskLevel: 'high',
    ambientTempC: 38.3,
    feelsLikeC: 42.9,
    summaryReason: 'Dense flyover concrete · High radiation re-emission',
    summaryReasonTa: 'மேம்பால கான்கிரீட் கட்டமைப்பு · தொடர் வெப்ப பிரதிபலிப்பு',
    coordinates: {
      lat: 13.0515,
      lng: 80.2120,
      svgX: 195,
      svgY: 280,
    },
    populationDensityPerSqKm: 24500,
    diagnosis: {
      vegetationDeficit: -35,
      builtUpDensity: 86,
      pavedSurface: 83,
      humanExposureIndex: 85,
      albedo: 0.15,
      canopyCoverPercent: 8.4,
    },
    sensitiveFacilities: [
      { name: 'Vadapalani Temple Entrance & Market Square', nameTa: 'வடபழனி கோவில் நுழைவாயில் சந்தை', type: 'market', distanceMeters: 140 },
      { name: 'SIMS Multispecialty & Government Ward', nameTa: 'மருத்துவமனை வளாகம்', type: 'hospital', distanceMeters: 310 },
      { name: 'Vadapalani MTC Bus Terminus', nameTa: 'வடபழனி பேருந்து நிலையம்', type: 'transit', distanceMeters: 90 },
    ],
    recommendedInterventions: [
      'Under-flyover vertical green biowalls and pocket seating',
      'Cool-pavement treatments on market bypass lanes',
      'Rapid tree canopy infill around bus depot'
    ],
    recommendedInterventionsTa: [
      'மேம்பாலத்தின் கீழ் செங்குத்துப் பசுமை மற்றும் இருக்கைகள்',
      'சந்தை வழிப்பாதைகளில் வெப்பக் குறைப்பு நடைபாதை தளம்',
      'பேருந்து நிலைய சுற்றளவில் துரித மரம் நடுதல்'
    ],
    nearestProjectId: 'proj-022',
  },
  {
    id: 'hs-velachery',
    name: 'Velachery Bypass & Vijayanagar Junction',
    nameTa: 'வேளச்சேரி பைபாஸ் & விஜயநகர் சந்திப்பு',
    zone: 'Zone 14 (Perungudi)',
    zoneTa: 'மண்டலம் 14 (பெருங்குடி)',
    wardNumber: 178,
    riskScore: 72,
    riskLevel: 'moderate',
    ambientTempC: 37.5,
    feelsLikeC: 41.6,
    summaryReason: 'High paved retail strip · Moderated by southern wetland breeze',
    summaryReasonTa: 'நீண்ட வணிகப் பாதை · சதுப்புநிலக் காற்றுடன் கூடிய மிதமான வெப்பம்',
    coordinates: {
      lat: 12.9815,
      lng: 80.2180,
      svgX: 240,
      svgY: 480,
    },
    populationDensityPerSqKm: 19800,
    diagnosis: {
      vegetationDeficit: -28,
      builtUpDensity: 74,
      pavedSurface: 78,
      humanExposureIndex: 76,
      albedo: 0.16,
      canopyCoverPercent: 12.1,
    },
    sensitiveFacilities: [
      { name: 'Vijayanagar Bus Hub', nameTa: 'விஜயநகர் பேருந்து முனையம்', type: 'transit', distanceMeters: 100 },
      { name: 'Velachery Government Higher Secondary School', nameTa: 'அரசு மேல்நிலைப் பள்ளி', type: 'school', distanceMeters: 340 },
    ],
    recommendedInterventions: [
      'Lake perimeter vegetative cooling buffer',
      'Reflective cool coatings for suburban commercial strip'
    ],
    recommendedInterventionsTa: [
      'ஏரி சுற்றளவில் பசுமை குளிர்ச்சி வளையம்',
      'வணிக கட்டடங்களுக்கு சூரிய-பிரதிபலிப்பு பூச்சு'
    ],
  },
  {
    id: 'hs-mylapore',
    name: 'Mylapore Heritage Precinct (South Mada St)',
    nameTa: 'மயிலாப்பூர் பாரம்பரிய பகுதி (தெற்கு மாட வீதி)',
    zone: 'Zone 09 (Teynampet)',
    zoneTa: 'மண்டலம் 09 (தேனாம்பேட்டை)',
    wardNumber: 124,
    riskScore: 67,
    riskLevel: 'moderate',
    ambientTempC: 36.8,
    feelsLikeC: 40.2,
    summaryReason: 'Dense traditional buildings · Partial shade from temple tank & heritage trees',
    summaryReasonTa: 'பாரம்பரிய கட்டடங்கள் · குளக்கரை மற்றும் மரங்களால் மிதமான பாதுகாப்பு',
    coordinates: {
      lat: 13.0336,
      lng: 80.2690,
      svgX: 340,
      svgY: 340,
    },
    populationDensityPerSqKm: 27000,
    diagnosis: {
      vegetationDeficit: -22,
      builtUpDensity: 78,
      pavedSurface: 69,
      humanExposureIndex: 74,
      albedo: 0.18,
      canopyCoverPercent: 14.5,
    },
    sensitiveFacilities: [
      { name: 'Kapaleeshwarar Tank Pilgrim Walkway', nameTa: 'கபாலீஸ்வரர் திருக்குள நடைபாதை', type: 'market', distanceMeters: 50 },
      { name: 'Lady Sivaswami Ayyar Girls School', nameTa: 'சீதாம்பாள் பெண்கள் பள்ளி', type: 'school', distanceMeters: 220 },
    ],
    recommendedInterventions: [
      'Traditional shade pergola canopies with native flowering creepers',
      'Permeable cool pavers around temple outer rings'
    ],
    recommendedInterventionsTa: [
      'பாரம்பரிய நிழல் பந்தல்கள் மற்றும் கொடிகள்',
      'குளத்தைச் சுற்றி நீர் ஊடுருவும் குளிர் நடைபாதை கற்கள்'
    ],
  },
  {
    id: 'hs-besantnagar',
    name: 'Besant Nagar & Coastal Strip',
    nameTa: 'பெசன்ட் நகர் & கடற்கரையோர பகுதி',
    zone: 'Zone 13 (Adyar)',
    zoneTa: 'மண்டலம் 13 (அடையாறு)',
    wardNumber: 175,
    riskScore: 49,
    riskLevel: 'low',
    ambientTempC: 34.2,
    feelsLikeC: 37.1,
    summaryReason: 'Marine sea breeze buffer · Preserved avenue trees · Low albedo retention',
    summaryReasonTa: 'கடல் காற்று பாதுகாப்பு · முதிர்ந்த மரங்கள் · குறைவான வெப்பத் தேக்கம்',
    coordinates: {
      lat: 13.0001,
      lng: 80.2695,
      svgX: 350,
      svgY: 460,
    },
    populationDensityPerSqKm: 14200,
    diagnosis: {
      vegetationDeficit: -8,
      builtUpDensity: 52,
      pavedSurface: 48,
      humanExposureIndex: 45,
      albedo: 0.22,
      canopyCoverPercent: 26.8,
    },
    sensitiveFacilities: [
      { name: 'Elliot Promenade Beach Walk', nameTa: 'எலியட்ஸ் கடற்கரை நடைபாதை', type: 'transit', distanceMeters: 120 },
      { name: 'Besant Theosophical High School', nameTa: 'தியோசாபிகல் உயர்நிலைப் பள்ளி', type: 'school', distanceMeters: 400 },
    ],
    recommendedInterventions: [
      'Coastal dune vegetation preservation',
      'Bio-retention swales and public hydration points'
    ],
    recommendedInterventionsTa: [
      'கடற்கரை தாவர பாதுகாப்பு',
      'பொது குடிநீர் நிலையங்கள் மற்றும் மழைநீர் உறிஞ்சு குழிகள்'
    ],
  }
];

export const getPlainCausesForHotspot = (hotspot: Hotspot): PlainVulnerabilityCause[] => {
  const canopy = hotspot.diagnosis?.canopyCoverPercent ?? 6;
  const paved = hotspot.diagnosis?.pavedSurface ?? 80;
  
  return [
    {
      label: 'Low shade and tree cover',
      labelTa: 'குறைந்த நிழல் மற்றும் மரப்பரப்பு',
      description: `Very low tree shade along walking routes (approx. ${canopy}% canopy coverage).`,
      descriptionTa: `நடைபாதைகளில் மிகக் குறைந்த மர நிழல் (சுமார் ${canopy}% பசுமை பரப்பு).`,
      iconType: 'shade'
    },
    {
      label: 'Dark pavement absorbing heat',
      labelTa: 'வெப்பத்தை உறிஞ்சும் தார் மற்றும் கான்கிரீட் தளம்',
      description: `Paved roads and dark tiles (${paved}% of surface) trap intense solar radiation during peak daylight.`,
      descriptionTa: `அடர் தார் சாலைகளும் நடைபாதைக் கற்களும் (${paved}% தளம்) சூரிய வெப்பத்தை அதிகம் உறிஞ்சித் தக்கவைக்கின்றன.`,
      iconType: 'pavement'
    },
    {
      label: 'Dense buildings trapping warm air',
      labelTa: 'வெப்பக் காற்றைச் சிறைபிடிக்கும் நெருக்கமான கட்டடங்கள்',
      description: 'Closely packed concrete structures block natural air circulation and slow night-time cooling.',
      descriptionTa: 'நெருக்கமான கான்கிரீட் கட்டடங்கள் இயற்கைக் காற்று வீசுவதைத் தடுத்து இரவிலும் வெப்பத்தை தக்கவைக்கின்றன.',
      iconType: 'buildings'
    },
    {
      label: 'High pedestrian traffic',
      labelTa: 'அதிக மக்கள் நடமாட்டம்',
      description: 'High daytime footfall at transit junctions, market stalls, and bus queues exposed without overhead shade.',
      descriptionTa: 'பேருந்து நிறுத்தங்கள் மற்றும் சந்தைப் பகுதிகளில் மக்கள் நேரடி வெயிலில் செல்கின்றனர்.',
      iconType: 'pedestrians'
    }
  ];
};

export const MOCK_PROJECTS: CoolingProject[] = [
  {
    id: 'proj-047',
    code: 'Project #047',
    title: 'T. Nagar Green Canopy & Cool Corridors',
    titleTa: 'தி. நகர் பசுமை மர நிழல் மற்றும் குளிர் நடைபாதை திட்டம்',
    hotspotId: 'hs-tnagar',
    location: 'T. Nagar (Pondy Bazaar & Usman Rd Walkway), Zone 10',
    locationTa: 'தி. நகர் (பாண்டி பஜார் & உஸ்மான் சாலை), மண்டலம் 10',
    targetDescription: 'High heat-risk commercial core with extreme daytime pedestrian footfall and 84% paved asphalt surface.',
    targetDescriptionTa: 'அதிக வெப்ப அபாயமுள்ள வணிக மையத்தில் நடைபாதை நிழல் மற்றும் சூரிய-பிரதிபலிப்பு குளிர் கூரைகள் அமைத்தல்.',
    interventions: [
      '450 Native street trees in porous tree wells',
      '18,000 sq.ft solar-reflective high-albedo cool roof coating',
      '3 Solar-powered misting public transit shade canopies'
    ],
    interventionsTa: [
      '450 நாட்டு மரக்கன்றுகள் நடுதல்',
      '18,000 சதுர அடி சூரிய-பிரதிபலிப்பு வெள்ளைக் கூரை பூச்சு',
      '3 சூரியசக்தி மூடுபனி நிழற்குடைகள்'
    ],
    budgetLakhs: 14.6,
    timelineDays: 60,
    elapsedDays: 38,
    status: 'in_progress',
    responsibleAuthority: 'Ward Engineering Office (Zone 10)',
    responsibleAuthorityTa: 'வார்டு பொறியியல் அலுவலகம் (மண்டலம் 10)',
    contractor: 'Tamil Nadu Urban Infrastructure Services & Green Works',
    quantities: {
      treesCount: 450,
      coolRoofSqFt: 18000,
      shadeCanopiesCount: 3,
    },
    impactEstimate: {
      surfaceTempDropC: 'Est. 2–3°C surface reduction (model estimate)',
      canopyGrowthPct: 'Shade corridor expansion (model estimate)',
    },
    stages: [
      {
        stage: 'planned',
        label: 'Site Feasibility & Plan Approval',
        labelTa: 'தள சாத்தியக்கூறு மற்றும் ஒப்புதல்',
        date: '14 May 2026',
        completed: true,
        active: false,
        notes: 'Ward 136 spatial feasibility and citizen walkability survey verified.'
      },
      {
        stage: 'assigned',
        label: 'Contractor & Material Procurement',
        labelTa: 'ஒப்பந்தம் மற்றும் பொருட்கள் கொள்முதல்',
        date: '02 June 2026',
        completed: true,
        active: false,
        notes: 'High-SRI reflective paint and native nursery stock mobilized.'
      },
      {
        stage: 'in_progress',
        label: 'Execution: Planting & Roof Application',
        labelTa: 'செயல்படுத்துதல்: மரங்கள் நடுதல் & கூரை பூச்சு',
        date: '22 June 2026',
        completed: false,
        active: true,
        notes: '280/450 trees installed. 11,200 sq.ft cool roof applied on municipal market.'
      },
      {
        stage: 'completed',
        label: 'Civil Handover & Misting Activation',
        labelTa: 'பணி ஒப்படைப்பு மற்றும் மூடுபனி தொடக்கம்',
        date: 'Est. 20 July 2026',
        completed: false,
        active: false,
      },
      {
        stage: 'verified',
        label: 'Thermal Audit & Citizen Verification',
        labelTa: 'வெப்பநிலை தணிக்கை மற்றும் உறுதிப்படுத்தல்',
        date: 'Est. 10 August 2026',
        completed: false,
        active: false,
      },
    ]
  },
  {
    id: 'proj-031',
    code: 'Project #031',
    title: 'Anna Nagar Anganwadi & School Cool Roof Cluster',
    titleTa: 'அண்ணா நகர் அங்கன்வாடி & பள்ளி குளிர் கூரை இயக்கம்',
    hotspotId: 'hs-annanagar',
    location: 'Anna Nagar 2nd Avenue, Ward 102, Zone 08',
    locationTa: 'அண்ணா நகர் 2வது அவென்யூ, வார்டு 102, மண்டலம் 08',
    targetDescription: 'Vulnerable children and elderly population in institutional buildings exposed to intense indoor thermal load.',
    targetDescriptionTa: 'அரசு பள்ளிகள் மற்றும் அங்கன்வாடி மையங்களில் உள்ளரங்கு வெப்பத்தை குறைக்கும் குளிர் கூரை திட்டம்.',
    interventions: [
      '24,000 sq.ft high-reflectance SRI > 104 cool roof waterproofing',
      '120 Native shade avenue saplings',
      '4 Vertical ivy screens on west-facing school walls'
    ],
    interventionsTa: [
      '24,000 சதுர அடி குளிர் கூரை பூச்சு',
      '120 சாலையோர மரக்கன்றுகள்',
      'மேற்கு சுவர்களில் 4 பசுமை திரைகள்'
    ],
    budgetLakhs: 9.8,
    timelineDays: 45,
    elapsedDays: 24,
    status: 'in_progress',
    responsibleAuthority: 'Municipal Education & Social Welfare Wing',
    responsibleAuthorityTa: 'நகராட்சி கல்வி மற்றும் சமூக நலப் பிரிவு',
    contractor: 'Apex Eco-Coatings TN',
    quantities: {
      treesCount: 120,
      coolRoofSqFt: 24000,
      shadeCanopiesCount: 0,
    },
    impactEstimate: {
      surfaceTempDropC: 'Est. 2–4°C rooftop drop (model estimate)',
      canopyGrowthPct: 'Rooftop albedo gain (model estimate)',
    },
    stages: [
      { stage: 'planned', label: 'Civic Survey & Roof Cleanliness Audit', labelTa: 'திட்டமிடல் & ஆய்வு', date: '01 June 2026', completed: true, active: false },
      { stage: 'assigned', label: 'Tender Allocation & Inspection', labelTa: 'ஒப்பந்த ஒதுக்கீடு', date: '12 June 2026', completed: true, active: false },
      { stage: 'in_progress', label: 'Two-Coat Elastomeric Application', labelTa: 'பூச்சு பணி தொடக்கம்', date: '26 June 2026', completed: false, active: true },
      { stage: 'completed', label: 'Classroom Indoor Comfort Verification', labelTa: 'வகுப்பறை வெப்ப ஆய்வு', date: 'Est. 18 July 2026', completed: false, active: false },
      { stage: 'verified', label: 'Final Certification by Health Officer', labelTa: 'சுகாதார அலுவலர் சான்றிதழ்', date: 'Est. 30 July 2026', completed: false, active: false },
    ]
  },
  {
    id: 'proj-052',
    code: 'Project #052',
    title: 'George Town High-Density Transit Shading & Miyawaki',
    titleTa: 'ஜார்ஜ் டவுன் அடர் போக்குவரத்து நிழற்குடை & மியாவாக்கி',
    hotspotId: 'hs-georgetown',
    location: 'Broadway Bus Terminus & NSC Bose Rd, Zone 05',
    locationTa: 'பிராட்வே பேருந்து நிலையம் & என்.எஸ்.சி போஸ் சாலை, மண்டலம் 05',
    targetDescription: 'Extreme urban heat island in the historic trade quarter with near zero natural soil and 40°C+ ambient temperatures.',
    targetDescriptionTa: 'மரங்கள் முற்றிலும் இல்லாத வரலாற்று வணிகப் பகுதியில் குளிர்ச்சி அமைப்புகள் மற்றும் மியாவாக்கி குறுங்காடுகள்.',
    interventions: [
      '2 Dense pocket Miyawaki micro-forests (600 native saplings)',
      '6 Tensioned fabric shade canopies over pedestrian queues',
      'Continuous hydration and water misting nodes'
    ],
    interventionsTa: [
      '2 மியாவாக்கி குறுங்காடுகள் (600 மரக்கன்றுகள்)',
      '6 பெரிய நிழல் பந்தல்கள்',
      'தொடர் குடிநீர் மற்றும் மூடுபனி மையங்கள்'
    ],
    budgetLakhs: 18.2,
    timelineDays: 75,
    elapsedDays: 12,
    status: 'assigned',
    responsibleAuthority: 'Municipal Works & Green Cell (Zone 05)',
    responsibleAuthorityTa: 'நகராட்சி பணிகள் & பசுமை பிரிவு (மண்டலம் 05)',
    contractor: 'Tamil Nadu Green Mission Consortium',
    quantities: {
      treesCount: 600,
      coolRoofSqFt: 6000,
      shadeCanopiesCount: 6,
    },
    impactEstimate: {
      surfaceTempDropC: 'Est. 2–3°C drop (model estimate)',
      canopyGrowthPct: 'Pocket grove shade gain (model estimate)',
    },
    stages: [
      { stage: 'planned', label: 'Structural & Traffic Clearance', labelTa: 'போக்குவரத்து அனுமதி', date: '10 June 2026', completed: true, active: false },
      { stage: 'assigned', label: 'Soil Bed Preparation for Miyawaki', labelTa: 'மண் செப்பனிடுதல்', date: '28 June 2026', completed: false, active: true },
      { stage: 'in_progress', label: 'Micro-Forest Planting & Canopy Anchors', labelTa: 'நடவு & நிழற்குடை அமைத்தல்', date: 'Est. 15 July 2026', completed: false, active: false },
      { stage: 'completed', label: 'Public Commissioning', labelTa: 'மக்கள் பயன்பாட்டிற்கு திறப்பு', date: 'Est. 20 August 2026', completed: false, active: false },
      { stage: 'verified', label: '3-Month Survival & Thermal Audit', labelTa: 'மரங்கள் உயிர்வாழ்தல் தணிக்கை', date: 'Est. 15 Sept 2026', completed: false, active: false },
    ]
  },
  {
    id: 'proj-019',
    code: 'Project #019',
    title: 'Guindy Bus Terminus Misting & Industrial Buffer',
    titleTa: 'கிண்டி பேருந்து முனையம் மூடுபனி & பசுமை பாதுகாப்பு வளையம்',
    hotspotId: 'hs-guindy',
    location: 'Guindy Railway Link Road, Zone 13',
    locationTa: 'கிண்டி ரயில் இணைப்பு சாலை, மண்டலம் 13',
    targetDescription: 'Heat relief for 45,000 daily transit passengers facing radiation from metal sheds and tarmac.',
    targetDescriptionTa: 'தினசரி 45,000 பயணிகளுக்கு தகர மேற்கூரை வெப்பத்திலிருந்து உடனடி நிவாரணம்.',
    interventions: [
      'Industrial cool roof reflective paint on 32,000 sq.ft depot sheds',
      'Automated high-pressure evaporative cooling mist system',
      '180 Evergreen shade trees along terminal boundary'
    ],
    interventionsTa: [
      '32,000 சதுர அடி தொழிற்பேட்டை தகரக் கூரைகளில் குளிர் பூச்சு',
      'தானியங்கி உயர் அழுத்த மூடுபனி தெளிப்பான் அமைப்பு',
      '180 பசுமை மரங்கள் நடுதல்'
    ],
    budgetLakhs: 12.4,
    timelineDays: 50,
    elapsedDays: 50,
    status: 'completed',
    responsibleAuthority: 'Civic Transit & Environment Desk',
    responsibleAuthorityTa: 'நகராட்சி போக்குவரத்து & சுற்றுச்சூழல் பிரிவு',
    contractor: 'HydroCool Infrastructure TN',
    quantities: {
      treesCount: 180,
      coolRoofSqFt: 32000,
      shadeCanopiesCount: 2,
    },
    impactEstimate: {
      surfaceTempDropC: 'Est. 3–4°C drop in waiting bays (model estimate)',
      canopyGrowthPct: 'Boundary tree buffer (model estimate)',
    },
    stages: [
      { stage: 'planned', label: 'Civil Survey', labelTa: 'ஆய்வு', date: '15 March 2026', completed: true, active: false },
      { stage: 'assigned', label: 'Material Mobilization', labelTa: 'பொருட்கள் வரவு', date: '01 April 2026', completed: true, active: false },
      { stage: 'in_progress', label: 'Civil and Misting Works', labelTa: 'பணிகள் நிறைவு', date: '20 April 2026', completed: true, active: false },
      { stage: 'completed', label: 'Public Handover', labelTa: 'மக்கள் பயன்பாடு', date: '25 May 2026', completed: true, active: true },
      { stage: 'verified', label: 'Verification Completed by Civil Cell', labelTa: 'உறுதிப்படுத்தல் நிறைவு', date: '12 July 2026', completed: true, active: false },
    ]
  },
  {
    id: 'proj-022',
    code: 'Project #022',
    title: 'Kodambakkam Flyover Under-Pass Green Refuge',
    titleTa: 'கோடம்பாக்கம் மேம்பாலத்தின் கீழ் பசுமை நிழல் பூங்கா',
    hotspotId: 'hs-kodambakkam',
    location: 'Kodambakkam Railway Station Road Underpass, Zone 10',
    locationTa: 'கோடம்பாக்கம் ரயில் நிலைய மேம்பாலத்தின் கீழ், மண்டலம் 10',
    targetDescription: 'Converting concrete heat island under flyover into shaded, cool citizen resting refuge with drip-irrigated plants.',
    targetDescriptionTa: 'மேம்பாலத்தின் கீழ் உள்ள கான்கிரீட் பகுதியை பொதுமக்கள் இளைப்பாறும் பசுமை நிழல் பகுதியாக மாற்றுதல்.',
    interventions: [
      'Vertical hydroponic wall system on 14 bridge pillars',
      'Shaded stone benches with ambient passive cooling geometry',
      'Porous cool pavement replacing cracked asphalt'
    ],
    interventionsTa: [
      '14 பாலத் தூண்களில் செங்குத்து பசுமைத் தோட்டம்',
      'குளிர்ச்சியான நிழல் அமரும் கற்கள்',
      'நீர் ஊடுருவும் குளிர் நடைபாதை கற்கள்'
    ],
    budgetLakhs: 8.5,
    timelineDays: 30,
    elapsedDays: 30,
    status: 'verified',
    responsibleAuthority: 'Municipal Parks & Urban Forestry Wing',
    responsibleAuthorityTa: 'நகராட்சி பூங்காக்கள் & பசுமை பிரிவு',
    contractor: 'Chennai Green Infrastructure Initiative',
    quantities: {
      treesCount: 60,
      coolRoofSqFt: 0,
      shadeCanopiesCount: 2,
    },
    impactEstimate: {
      surfaceTempDropC: 'Est. 2°C micro-zone relief (model estimate)',
      canopyGrowthPct: 'Pillar vertical vegetation (model estimate)',
    },
    stages: [
      { stage: 'planned', label: 'Flyover Structural Clearance', labelTa: 'அனுமதி', date: '01 Feb 2026', completed: true, active: false },
      { stage: 'assigned', label: 'Contract Execution', labelTa: 'ஒப்பந்தம்', date: '15 Feb 2026', completed: true, active: false },
      { stage: 'in_progress', label: 'Civil Installation', labelTa: 'நிறுவுதல்', date: '01 March 2026', completed: true, active: false },
      { stage: 'completed', label: 'Commissioning', labelTa: 'செயல்பாடு', date: '20 March 2026', completed: true, active: false },
      { stage: 'verified', label: 'GCC Climate Cell Thermal Verification', labelTa: 'வெப்பநிலை சரிபார்ப்பு நிறைவு', date: '15 April 2026', completed: true, active: true },
    ]
  }
];

export const MOCK_INTERVENTION_OPTIONS: InterventionOption[] = [
  {
    id: 'option-a',
    code: 'Option A',
    title: 'Tree-Focused Strategy',
    titleTa: 'மரங்களை மையமாகக் கொண்ட உத்தி',
    tagline: 'High Long-term Ecological Canopy & Thermal Shielding',
    taglineTa: 'நீண்ட கால பசுமை மற்றும் நிழல் பாதுகாப்பு',
    focus: 'Urban Forestry & Sidewalk Tree Canopies',
    costLakhs: 14.8,
    relativeBenefit: 'High',
    benefitScore: 86,
    modelRankDescription: 'High estimated benefit over 3-5 year growth horizon; requires ongoing sapling protection.',
    modelRankDescriptionTa: '3-5 ஆண்டு காலத்தில் அதிக பலன் தரும்; தொடர் பராமரிப்பு தேவை.',
    timelineDays: 90,
    treeCount: 520,
    coolRoofSqFt: 8000,
    shadeCanopiesCount: 2,
    coBenefits: [
      'Carbon sequestration: ~13 tonnes CO2/year',
      'Air particulate absorption (PM2.5 / PM10)',
      'Sidewalk shade for pedestrians and street vendors'
    ],
    coBenefitsTa: [
      'கரிம உறிஞ்சுதல்: ~13 டன் CO2/ஆண்டு',
      'காற்று மாசு வடிகட்டுதல் (PM2.5 / PM10)',
      'நடைபாதை மக்களுக்கு தொடர் மர நிழல்'
    ],
    maintenanceRequirement: 'Bi-weekly watering protocol by GCC mobile tankers during first 24 months.',
    maintenanceRequirementTa: 'முதல் 24 மாதங்களுக்கு மாநகராட்சி டேங்கர்கள் மூலம் வாரமிருமுறை நீர் பாய்ச்சுதல்.'
  },
  {
    id: 'option-b',
    code: 'Option B',
    title: 'Balanced Cooling Strategy',
    titleTa: 'சமச்சீர் குளிர்ச்சி உத்தி',
    tagline: 'Highest among evaluated options — model estimate',
    taglineTa: 'பரிசீலிக்கப்பட்ட உத்திகளில் மிகச் சிறந்த பலன் — மாதிரி மதிப்பீடு',
    focus: 'Synergistic Trees + Cool Roofs + Transit Shade',
    costLakhs: 15.0,
    relativeBenefit: 'Highest',
    benefitScore: 94,
    modelRankDescription: 'Highest among evaluated options — model estimate. Combines immediate rooftop heat deflection with lasting tree canopy.',
    modelRankDescriptionTa: 'மதிப்பீடுகளில் மிக உயர்ந்தது. உடனடி கூரை குளிர்ச்சியுடன் கூடிய நீண்ட கால மர நிழல்.',
    timelineDays: 60,
    treeCount: 350,
    coolRoofSqFt: 19000,
    shadeCanopiesCount: 4,
    coBenefits: [
      'Immediate 3-4°C indoor cooling in municipal buildings & schools',
      'Immediate relief at bus waiting stops with misting shade',
      'Optimized capital efficiency across quick-win and durable interventions'
    ],
    coBenefitsTa: [
      'அரசு பள்ளிகள் மற்றும் கட்டடங்களில் உடனடியாக 3-4°C வெப்பக் குறைப்பு',
      'பேருந்து நிறுத்தங்களில் உடனடி நிழல் மற்றும் மூடுபனி வசதி',
      'குறைந்த செலவில் அதிகபட்ச பலன் தரும் சமச்சீர் அணுகுமுறை'
    ],
    maintenanceRequirement: 'Standard annual cool-roof wash & routine sapling drip line inspections.',
    maintenanceRequirementTa: 'ஆண்டுதோறும் கூரை கழுவுதல் & சொட்டு நீர் பாசன ஆய்வு.'
  },
  {
    id: 'option-c',
    code: 'Option C',
    title: 'Cool-Roof Focused Strategy',
    titleTa: 'குளிர் கூரையை மையமாகக் கொண்ட உத்தி',
    tagline: 'Fastest Direct Surface Albedo Augmentation',
    taglineTa: 'துரித சூரிய-பிரதிபலிப்பு கூரை பூச்சு உத்தி',
    focus: 'High-Albedo Reflective Coatings & Membranes',
    costLakhs: 14.2,
    relativeBenefit: 'Moderate-High',
    benefitScore: 81,
    modelRankDescription: 'Rapid 30-day turnaround; strong immediate surface temperature reduction but lower pedestrian shaded corridor impact.',
    modelRankDescriptionTa: '30 நாட்களில் விரைவாக முடிக்கலாம்; உடனடியாக கூரை சூடு தணியும், ஆனால் நடைபாதை நிழல் குறைவு.',
    timelineDays: 35,
    treeCount: 140,
    coolRoofSqFt: 29000,
    shadeCanopiesCount: 1,
    coBenefits: [
      'Deploys in under 35 days prior to peak summer heatwave',
      'Reduces electricity load for air circulation in tenements',
      'Minimal road digging or pedestrian disruption'
    ],
    coBenefitsTa: [
      'கோடை வெப்ப அலை தொடங்குவதற்குள் 35 நாட்களில் செய்து முடிக்கலாம்',
      'மின் விசிறி மற்றும் மின்சார பயன்பாட்டு செலவு குறையும்',
      'சாலை தோண்டுதல் அல்லது மக்கள் நடமாட்ட பாதிப்பு இல்லை'
    ],
    maintenanceRequirement: 'Bi-annual albedo inspection; re-coating after 3-4 monsoon seasons.',
    maintenanceRequirementTa: 'ஆண்டிற்கு இரண்டு முறை ஆய்வு; 3-4 மழைக்காலத்திற்கு பின் மறுபூச்சு.'
  }
];

export const MOCK_OBSERVATIONS: ObservationReport[] = [
  {
    id: 'GCC-OBS-8821',
    timestamp: '2 hours ago',
    type: 'Tree needs watering / maintenance',
    typeTa: 'மரக்கன்றுகளுக்கு நீர் / பராமரிப்பு தேவை',
    description: 'The newly planted neem saplings outside Pondy Bazaar metro entrance look parched due to consecutive dry days.',
    locationName: 'Pondy Bazaar, T. Nagar (Ward 136)',
    projectId: 'proj-047',
    status: 'Assigned to Ward',
    photoName: 'sapling_dry_pondypark.jpg',
    reporterContact: '+91 98401 *****'
  },
  {
    id: 'GCC-OBS-8804',
    timestamp: 'Yesterday',
    type: 'Cooling structure damaged',
    typeTa: 'நிழற்குடை அல்லது மூடுபனி சேதம்',
    description: 'Misting nozzle #3 at the Broadway bus queue is leaking water continuously onto the sidewalk.',
    locationName: 'Broadway Bus Stand, George Town',
    projectId: 'proj-052',
    status: 'Received',
    photoName: 'misting_nozzle_leak.jpg',
  },
  {
    id: 'GCC-OBS-8790',
    timestamp: '3 days ago',
    type: 'Project appears incomplete',
    typeTa: 'பணி பாதியில் நிற்பது போல் உள்ளது',
    description: 'Cool roof paint was applied on half of the Corporation High School roof but workers have not returned for 5 days.',
    locationName: 'Second Avenue, Anna Nagar',
    projectId: 'proj-031',
    status: 'Resolved',
  }
];

export const OBSERVATION_TYPES = [
  { value: 'Tree needs maintenance', labelEn: 'Tree needs maintenance / watering', labelTa: 'மரத்திற்கு நீர் / பராமரிப்பு தேவை' },
  { value: 'Cooling structure damaged', labelEn: 'Cooling structure or misting damaged', labelTa: 'நிழற்குடை அல்லது மூடுபனி பழுது' },
  { value: 'Reflective roof paint peeling', labelEn: 'Reflective cool roof paint peeling', labelTa: 'வெள்ளைக் கூரை பூச்சு உரிகிறது' },
  { value: 'Project appears incomplete', labelEn: 'Project appears paused or incomplete', labelTa: 'பணி முழுமையடையாமல் நிற்கிறது' },
  { value: 'Severe unshaded heat hazard', labelEn: 'Severe unshaded heat hazard spot', labelTa: 'கடுமையான நிழலற்ற வெப்ப அபாய இடம்' },
  { value: 'Other civic observation', labelEn: 'Other civic heat observation', labelTa: 'மற்ற பொதுக் கவனிப்பு' },
];

export const TRANSLATIONS = {
  en: {
    appTitle: 'HeatScape',
    appSubtitle: 'Tamil Nadu Urban Heat-Risk & Cooling Platform',
    civicBanner: 'Illustrative Chennai Demo Data',
    aiPrinciple: 'AI recommends. Humans decide.',
    roleCitizen: 'Citizen',
    rolePlanner: 'Municipal Planner',
    switchToPlanner: 'Planner View',
    switchToCitizen: 'Citizen View',
    todayHeatRisk: "Today's Heat Risk",
    nearbyHotspot: 'Nearby Hotspot',
    coolingProjectNearby: 'Cooling Project Nearby',
    viewDetails: 'View Details',
    viewWhy: 'View why area is vulnerable',
    viewCoolingProject: 'View Cooling Project',
    exploreMap: 'Explore Heat Map',
    reportObs: 'Submit Observation',
    demoDisclaimer: 'Civic Demonstration Tool · All metrics are model estimates based on illustrative Chennai demo data.',
    modelEstimate: 'Model estimate',
    plainCausesTitle: 'Why this area is vulnerable',
    plainCausesSubtitle: 'Key real-world conditions contributing to local heat-risk',
    riskLevels: {
      very_high: 'Very High Heat Risk',
      high: 'High Heat Risk',
      moderate: 'Moderate Heat Risk',
      low: 'Low Heat Risk',
    },
    navHome: 'Home',
    navMap: 'Heat Map',
    navProjects: 'Projects',
    navReport: 'Report',
    navPlannerDashboard: 'Dashboard',
    navActionPlanner: 'Action Plan',
    navBudget: 'Budget',
    navBrief: 'Brief',
    statusPills: {
      planned: 'Planned',
      assigned: 'Assigned',
      in_progress: 'In Progress',
      completed: 'Completed',
      verified: 'Verified',
    }
  },
  ta: {
    appTitle: 'ஹீட்ஸ்கேப்',
    appSubtitle: 'தமிழ்நாடு நகர்ப்புற வெப்ப அபாயம் & தணிப்பு தளம்',
    civicBanner: 'மாதிரி சென்னை செயல்முறைத் தரவு (Illustrative Chennai Demo Data)',
    aiPrinciple: 'AI பரிந்துரைக்கிறது. மனிதர்கள் தீர்மானிக்கிறார்கள்.',
    roleCitizen: 'பொதுமக்கள்',
    rolePlanner: 'நகராட்சி திட்டமிடுபவர்',
    switchToPlanner: 'திட்டமிடுபவர் பார்வை',
    switchToCitizen: 'பொதுமக்கள் பார்வை',
    todayHeatRisk: 'இன்றைய வெப்ப அபாயம்',
    nearbyHotspot: 'அருகிலுள்ள வெப்ப மையம்',
    coolingProjectNearby: 'அருகிலுள்ள குளிர்ச்சித் திட்டம்',
    viewDetails: 'விவரங்களைக் காண்க',
    viewWhy: 'காரணம் என்ன?',
    viewCoolingProject: 'குளிர்ச்சி திட்டத்தைக் காண்க',
    exploreMap: 'வெப்ப வரைபடம்',
    reportObs: 'கவனிப்பைப் பதிவு செய்',
    demoDisclaimer: 'மாதிரி செயல்முறை தளம் · அனைத்து அளவீடுகளும் மாதிரி மதிப்பீடுகளே.',
    modelEstimate: 'மாதிரி மதிப்பீடு',
    plainCausesTitle: 'வெப்ப பாதிப்புக்கான காரணங்கள்',
    plainCausesSubtitle: 'இயற்கையான காரணங்கள் மற்றும் தரைநிலை சூழல்',
    riskLevels: {
      very_high: 'மிக அதிக வெப்ப அபாயம்',
      high: 'அதிக வெப்ப அபாயம்',
      moderate: 'மிதமான வெப்ப அபாயம்',
      low: 'குறைந்த வெப்ப அபாயம்',
    },
    navHome: 'முகப்பு',
    navMap: 'வரைபடம்',
    navProjects: 'திட்டங்கள்',
    navReport: 'பதிவு',
    navPlannerDashboard: 'டாஷ்போர்டு',
    navActionPlanner: 'செயல் திட்டம்',
    navBudget: 'பட்ஜெட்',
    navBrief: 'அறிக்கை',
    statusPills: {
      planned: 'திட்டமிடப்பட்டது',
      assigned: 'ஒதுக்கப்பட்டது',
      in_progress: 'நடைபெறுகிறது',
      completed: 'நிறைவடைந்தது',
      verified: 'உறுதிசெய்யப்பட்டது',
    }
  }
};

