/**
 * Telugu Wedding Invitation Master Data
 * All names, dates, muhurthams, and details strictly comply with traditional Telugu wedding customs
 * and the bride & groom families' exact specifications.
 */

export interface FamilyMember {
  name: string;
  relation: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  teluguTitle: string;
  englishDate: string;
  teluguDate: string;
  time: string;
  location: string;
  venueName: string;
  mapsUrl?: string;
  note?: string;
  startDateIso: string; // ISO string with IST offset: +05:30
  endDateIso: string;
  durationMinutes: number;
}

export interface SevenStep {
  stepNumber: number;
  teluguNumber: string;
  title: string;
  vow: string;
  englishMeaning: string;
}

export interface ContactPerson {
  name: string;
  relation: string;
  phone: string;
  whatsappNumber: string;
}

export const weddingData = {
  // Title & Auspicious Invocations
  invocation: {
    sriRastu: 'శ్రీరస్తు',
    subhamastu: 'శుభమస్తు',
    avinamastu: 'అవిఘ్నమస్తు',
    tagline: 'మా ఇంటి పెళ్లికి మీకు హృదయపూర్వక ఆహ్వానం',
    mainHeading: 'శుభ వివాహ ఆహ్వాన పత్రిక',
    grandTitle: 'కళ్యాణ మహోత్సవం',
    shloka: 'శ్రీరామపత్నీ జనకస్య పుత్రీ సీతాంగనా సుందర కోమలాంగీ। భూగర్భజాతా భువనైక మాతా వధూవరాభ్యాం వరదా భవంతు॥',
    shlokaMeaning: 'శ్రీరాముని అర్ధాంగి, జనక మహారాజు పుత్రిక, భూదేవి గర్భమున జన్మించిన లోకమాత సీతాదేవి నూతన వధూవరులకు సకల శుభములను, వరములను అనుగ్రహించుగాక.',
  },

  // Bride details
  bride: {
    salutation: 'చి.ల.సౌ.',
    name: 'వెంకట మృదుల',
    fullName: 'చి.ల.సౌ. వెంకట మృదుల',
    qualification: 'B.Tech.',
    line: 'మా ఏకైక పుత్రిక చి.ల.సౌ. వెంకట మృదుల',
    familyRole: 'వధువు',
    photoUrl: '/media/bride.jpg',
    driveId: '',
  },

  // Groom details
  groom: {
    salutation: 'చి.',
    name: 'మల్లికార్జున',
    fullName: 'చి. మల్లికార్జున',
    qualification: 'B.Tech.',
    line: 'శ్రీ కొణతం మాలకొండయ్య – శ్రీమతి నారాయణమ్మ గార్ల ఏకైక పుత్రుడు చి. మల్లికార్జున',
    familyRole: 'వరుడు',
    photoUrl: '/media/groom.jpg',
    driveId: '',
  },

  // Couple photo & video
  couple: {
    photoUrl: '/media/couple.jpg',
    driveId: '',
  },

  // Two Wedding Invitation Videos
  videos: [
    {
      id: 'video-1',
      title: 'సాంప్రదాయ కళ్యాణ వైభోగం',
      subtitle: 'ఇనకోల్లు వారి కళ్యాణ మహోత్సవ ఆహ్వానం (రఘువంశ రామయ్య శుభయోగం)',
      badge: 'ఆహ్వానం 1',
      videoUrl: '/media/invitation.mp4',
      driveId: '',
    },
    {
      id: 'video-2',
      title: 'దివ్య మంగళ పెండ్లిపిలుపు',
      subtitle: 'ఇనకోల్లు వారి పెండ్లిపిలుపు (వధువేమో అలమేలు వరుడట శ్రీవారు)',
      badge: 'ఆహ్వానం 2',
      videoUrl: '/media/invitation2.mp4',
      driveId: '',
    },
  ],

  // Default video reference
  video: {
    title: 'మా వివాహ ఆహ్వాన దృశ్య రూపకం',
    subtitle: 'మా జీవితంలోని ఈ మధుర క్షణాలను మీతో పంచుకోవాలని ఆశిస్తున్నాము',
    videoUrl: '/media/invitation.mp4',
    driveId: '',
  },

  music: {
    audioUrl: '/media/music.mp3',
    driveId: '',
    title: 'మంగళ వాయిద్యం — వివాహ గీతం',
  },

  // Bride's Family (Inviting Family / Hosts)
  brideFamily: {
    title: 'ఆహ్వానించువారు (వధువు తల్లిదండ్రులు)',
    parents: 'శ్రీ ఇనకొల్లు సుబ్రమణ్యం – శ్రీమతి సుప్రజ',
    village: 'మాచవరం గ్రామం',
    mandal: 'కందుకూరు మండలం',
    district: 'ప్రకాశం జిల్లా',
    fullAddress: 'మాచవరం గ్రామం, కందుకూరు మండలం, ప్రకాశం జిల్లా.',
    roleDescription: 'మా ఏకైక పుత్రిక చి.ల.సౌ. వెంకట మృదుల వివాహ మహోత్సవానికి ఆహ్వానించుచున్నాము.',
  },

  // Groom's Family
  groomFamily: {
    title: 'వరుని తల్లిదండ్రులు',
    parents: 'శ్రీ కొణతం మాలకొండయ్య – శ్రీమతి నారాయణమ్మ గార్లు',
    village: 'సీతారామపురం (సంగసానిపల్లి) గ్రామం',
    mandal: 'ఉదయగిరి మండలం',
    district: 'నెల్లూరు జిల్లా వాస్తవ్యులు',
    fullAddress: 'సీతారామపురం (సంగసానిపల్లి) గ్రామం, ఉదయగిరి మండలం, నెల్లూరు జిల్లా వాస్తవ్యులు.',
    description: 'శ్రీ కొణతం మాలకొండయ్య – శ్రీమతి నారాయణమ్మ గార్ల ఏకైక పుత్రుడు చి. మల్లికార్జున, సీతారామపురం (సంగసానిపల్లి) గ్రామం, ఉదయగిరి మండలం, నెల్లూరు జిల్లా వాస్తవ్యులు.',
  },

  // Array of Groom Family Members (ONLY the two printed parents as specified)
  groomFamilyMembers: [
    {
      name: 'శ్రీ కొణతం మాలకొండయ్య',
      relation: 'వరుని తండ్రిగారు',
    },
    {
      name: 'శ్రీమతి కొణతం నారాయణమ్మ',
      relation: 'వరుని తల్లిగారు',
    },
  ] as FamilyMember[],

  // Muhurtham & Panchangam details
  muhurtham: {
    dateDescription: 'శ్రీ పరాభవ నామ సంవత్సర ఆశ్వీయుజ మాస బహుళ పంచమి, మృగశిర నక్షత్రయుక్త, మిథున లగ్న పుష్కరాంశము నందు. దైవజ్ఞులు సుముహూర్తము నిశ్చయించినారు.',
    englishDateFormatted: 'గురువారం, 29 అక్టోబర్ 2026, రాత్రి 10:10 నిమిషములకు',
    exactTime: 'రాత్రి 10:10 గంటల నుండి 10:45 గంటల వరకు',
    targetTimestamp: '2026-10-29T22:10:00+05:30', // Exact Muhurtham time in IST
    verifiedNote: 'ముద్రిత ముహూర్తం — కుటుంబంతో ధృవీకరించుకోండి',
  },

  // Invitation Card Text
  invitationNote: 'చి.ల.సౌ. వెంకట మృదుల మరియు చి. మల్లికార్జున ల వివాహ మహోత్సవానికి మీకు హృదయపూర్వక ఆహ్వానం',
  closingText: 'ఈ శుభ కార్యమునకు విచ్చేసి నూతన వధూవరులను ఆశీర్వదించ ప్రార్థన.',
  closingWishes: 'ఆత్మీయ బంధుమిత్రుల అభినందనలతో…',

  // Events (Asia/Kolkata)
  events: [
    {
      id: 'gandhapu-nalugu',
      title: 'గంధపు నలుగు',
      teluguTitle: 'గంధపు నలుగు మరియు మంగళ స్నానములు',
      englishDate: 'Wednesday, 28 October 2026',
      teluguDate: 'బుధవారం, 28 అక్టోబర్ 2026',
      time: 'ఉదయం 8:00 గంటలకు',
      location: 'మాచవరం గ్రామం, కందుకూరు మండలం, ప్రకాశం జిల్లా.',
      venueName: 'మాచవరం గ్రామం (వధువు స్వగృహము)',
      mapsUrl: 'https://maps.app.goo.gl/BpHZiBqFrFYpVLFA7?g_st=awb',
      startDateIso: '2026-10-28T08:00:00+05:30',
      endDateIso: '2026-10-28T09:00:00+05:30',
      durationMinutes: 60,
      note: 'సాంప్రదాయ గంధపు నలుగు కార్యక్రమం',
    },
    {
      id: 'vindu',
      title: 'విందు',
      teluguTitle: 'శుభ విందు భోజనములు',
      englishDate: 'Wednesday, 28 October 2026',
      teluguDate: 'బుధవారం, 28 అక్టోబర్ 2026',
      time: 'మధ్యాహ్నం 12:00 గంటలకు',
      location: 'మాచవరం గ్రామం (వధువు స్వగృహము), కందుకూరు మండలం, ప్రకాశం జిల్లా.',
      venueName: 'మాచవరం గ్రామం (వధువు స్వగృహము)',
      startDateIso: '2026-10-28T12:00:00+05:30',
      endDateIso: '2026-10-28T14:00:00+05:30',
      durationMinutes: 120,
      note: 'ఆత్మీయ బంధుమిత్రులకు విందు భోజనం',
    },
    {
      id: 'vivahamu',
      title: 'వివాహము',
      teluguTitle: 'కళ్యాణ మహోత్సవం (సుముహూర్తం)',
      englishDate: 'Thursday, 29 October 2026',
      teluguDate: 'గురువారం, 29 అక్టోబర్ 2026',
      time: 'రాత్రి 10:10 గంటల నుండి 10:45 గంటల వరకు',
      location: 'వరుని స్వగృహము, సీతారామపురం (సంగసానిపల్లి) గ్రామం, ఉదయగిరి మండలం, నెల్లూరు జిల్లా.',
      venueName: 'వరుని స్వగృహము, సీతారామపురం (సంగసానిపల్లి)',
      mapsUrl: 'https://maps.app.goo.gl/AXs8cZQvPjfwjqiX6?g_st=aw',
      note: 'ముద్రిత ముహూర్తం — కుటుంబంతో ధృవీకరించుకోండి',
      startDateIso: '2026-10-29T22:10:00+05:30',
      endDateIso: '2026-10-29T22:45:00+05:30',
      durationMinutes: 35,
    },
  ] as WeddingEvent[],

  // Seven Steps (సప్తపది) - Exactly as required
  sevenSteps: [
    {
      stepNumber: 1,
      teluguNumber: 'మొదటి అడుగు',
      title: 'ఆహారం మరియు పోషణ',
      vow: 'మన కుటుంబానికి అవసరమైన ఆహారం, ఆరోగ్యం, పోషణ కోసం ఇద్దరం కలిసి కృషి చేద్దాం.',
      englishMeaning: 'First Step: Mutual nourishment and prosperity.',
    },
    {
      stepNumber: 2,
      teluguNumber: 'రెండవ అడుగు',
      title: 'ఆరోగ్యం మరియు బలం',
      vow: 'సుఖదుఃఖాల్లో ఒకరికొకరం తోడుగా నిలుస్తూ, శారీరకంగా మరియు మానసికంగా బలంగా ఉండేందుకు సహకరించుకుందాం.',
      englishMeaning: 'Second Step: Strength in body, mind and spirit.',
    },
    {
      stepNumber: 3,
      teluguNumber: 'మూడవ అడుగు',
      title: 'సంపద మరియు బాధ్యత',
      vow: 'కుటుంబ అభివృద్ధి కోసం కష్టపడి పనిచేస్తూ, బాధ్యతలను పంచుకుంటూ నిజాయితీగా జీవిద్దాం.',
      englishMeaning: 'Third Step: Shared wealth and noble responsibilities.',
    },
    {
      stepNumber: 4,
      teluguNumber: 'నాల్గవ అడుగు',
      title: 'ప్రేమ మరియు ఆనందం',
      vow: 'ప్రేమ, గౌరవం, నమ్మకం, పరస్పర అవగాహనతో మన ఇంటిని ఆనందమయంగా నిర్మించుకుందాం.',
      englishMeaning: 'Fourth Step: Love, mutual respect and harmony.',
    },
    {
      stepNumber: 5,
      teluguNumber: 'ఐదవ అడుగు',
      title: 'కుటుంబం మరియు సంతానం',
      vow: 'కుటుంబ బంధాలను గౌరవిస్తూ, బాధ్యతలను కలిసి నిర్వర్తిస్తూ భవిష్యత్తు శ్రేయస్సు కోసం కృషి చేద్దాం.',
      englishMeaning: 'Fifth Step: Honoring familial traditions and noble future generation.',
    },
    {
      stepNumber: 6,
      teluguNumber: 'ఆరవ అడుగు',
      title: 'ఆరోగ్యకరమైన సహజీవనం',
      vow: 'ప్రతి దశలో ఒకరికొకరం అండగా ఉంటూ ఆరోగ్యంతో, ప్రశాంతతతో, సహనంతో ముందుకు సాగుదాం.',
      englishMeaning: 'Sixth Step: Lifelong peace, patience and seasonal wellness.',
    },
    {
      stepNumber: 7,
      teluguNumber: 'ఏడవ అడుగు',
      title: 'జీవితాంతం స్నేహం మరియు నమ్మకం',
      vow: 'జీవితాంతం మంచి స్నేహితులుగా, నమ్మకమైన భాగస్వాములుగా, ఒకరి కలలను మరొకరు గౌరవిస్తూ కలిసి నడుద్దాం.',
      englishMeaning: 'Seventh Step: Eternal friendship, supreme fidelity and companionship.',
    },
  ] as SevenStep[],

  sevenStepsClosing: 'ఏడు అడుగులు… ఒక జీవిత ప్రయాణం… ప్రేమతో, నమ్మకంతో, అనుబంధంతో ఎప్పటికీ కలిసి!',
  sevenStepsTraditionNote: 'గమనిక: సాంప్రదాయాలను బట్టి సప్తపది వివరణలు ప్రాంతీయంగా కొద్దిగా మారవచ్చు.',

  // Contacts
  contacts: [
    {
      name: 'శ్రీ ఇనకొల్లు సుబ్రమణ్యం',
      relation: 'వధువు తండ్రిగారు',
      phone: '8919088804',
      whatsappNumber: '918919088804',
    },
    {
      name: 'శ్రీ కొణతం మాలకొండయ్య',
      relation: 'వరుని తండ్రిగారు',
      phone: '7842732722',
      whatsappNumber: '917842732722',
    },
  ] as ContactPerson[],

  whatsappMessageText: 'నమస్కారం! చి.ల.సౌ. వెంకట మృదుల మరియు చి. మల్లికార్జున ల వివాహ ఆహ్వాన వెబ్సైట్ ద్వారా సంప్రదిస్తున్నాను. వివాహ వివరాల గురించి తెలుసుకోవాలనుకుంటున్నాను.',

  // Final Blessings & Hosts summary
  finalBlessings: {
    heading: 'ఆశీస్సులతో… విచ్చేయండి',
    families: [
      {
        names: 'శ్రీ ఇనకొల్లు సుబ్రమణ్యం – శ్రీమతి సుప్రజ గార్లు',
        description: 'మరియు కుటుంబ సభ్యులు (మాచవరం గ్రామం)',
        relation: 'వధువు తరఫు బంధుమిత్రులు',
      },
      {
        names: 'శ్రీ కొణతం మాలకొండయ్య – శ్రీమతి నారాయణమ్మ గార్లు',
        description: 'మరియు కుటుంబ సభ్యులు (సీతారామపురం గ్రామం)',
        relation: 'వరుని తరఫు బంధుమిత్రులు',
      },
    ],
    thankYou: 'ధన్యవాదములు',
    invitationShareText: 'చి.ల.సౌ. వెంకట మృదుల మరియు చి. మల్లికార్జున ల పవిత్ర వివాహ ఆహ్వాన పత్రికను వీక్షించండి: ',
  },
};
