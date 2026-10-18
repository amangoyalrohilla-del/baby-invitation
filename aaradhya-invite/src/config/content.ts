/**
 * All visible wording, derived from the config so the same site works for
 * a baby girl, a baby boy, or a baby shower without rewriting components.
 * Edit any line here if a client wants different phrasing.
 */
import type { InvitationConfig } from './invitation';

export function buildContent(c: InvitationConfig) {
  const shower = c.invitationMode === 'babyShower';
  const boy = c.babyGender === 'boy';
  const little = boy ? 'नन्हे राजकुमार' : 'नन्ही परी'; // oblique case
  const littleOur = boy ? 'हमारे नन्हे राजकुमार' : 'हमारी नन्ही परी';
  const surname = c.familySurname;
  const mother = c.motherName;
  const father = c.fatherName;
  const coupleShort = `${firstName(mother)} एवं ${firstName(father)}`;

  const eventName =
    c.eventName ?? (shower ? 'गोद भराई समारोह' : 'नामकरण एवं स्वागत समारोह');

  if (shower) {
    return {
      shower,
      eventName,
      titleName: coupleShort,
      monogram: firstLetter(mother),
      opening: {
        above: 'एक नन्हा सा चमत्कार...',
        below: 'जल्द आ रहा है हमारी खुशियों की दुनिया में',
        cta: 'निमंत्रण खोलें ✨',
      },
      hero: {
        script: 'Little One Is On The Way',
        headline: 'हमारे आँगन में जल्द गूँजेगी नन्ही किलकारी',
        name: coupleShort,
        statement: `आप सपरिवार सादर आमंत्रित हैं ${mother} की गोद भराई के मंगल अवसर पर।`,
      },
      reveal: {
        heading: 'देखिए हमारी आने वाली खुशी की झलक',
        caption: 'नन्हे कदमों की आहट से महक उठा है घर-आँगन',
      },
      parents: {
        heading: 'होने वाले मम्मी-पापा',
        message:
          'हमारी दुनिया में जल्द ही एक नई मुस्कान जुड़ने वाली है। इस अनमोल इंतज़ार के उत्सव में आपकी उपस्थिति हमारे लिए अत्यंत विशेष होगी।',
      },
      family: {
        text: 'आपकी शुभकामनाएँ और आशीर्वाद होने वाली माँ और आने वाले नन्हे मेहमान के लिए अनमोल हैं।',
      },
      invitation: [
        'ईश्वर की असीम कृपा से हमारे परिवार में नन्हे मेहमान के आगमन की मंगल प्रतीक्षा है।',
        `इस शुभ अवसर पर आयोजित ${eventName} में आप सपरिवार सादर आमंत्रित हैं।`,
        'आपकी गरिमामयी उपस्थिति, स्नेह एवं आशीर्वाद से यह शुभ अवसर और भी मंगलमय होगा।',
      ],
      final: {
        sub: 'होने वाली माँ और नन्हे मेहमान को अपना प्यार और आशीर्वाद देने अवश्य पधारें।',
        from: `${surname} परिवार की ओर से सस्नेह निमंत्रण`,
      },
    };
  }

  return {
    shower,
    eventName,
    titleName: c.babyName ?? coupleShort,
    monogram: firstLetter(c.babyName ?? mother),
    opening: {
      above: 'एक नन्हा सा चमत्कार...',
      below: 'हमारी खुशियों की दुनिया में आपका स्वागत है',
      cta: 'निमंत्रण खोलें ✨',
    },
    hero: {
      script: 'Our Little Miracle',
      headline: boy ? 'हमारे आँगन में आया है एक नन्हा राजकुमार' : 'हमारे आँगन में आई है एक नन्ही परी',
      name: c.babyName ?? '',
      statement: `आप सपरिवार सादर आमंत्रित हैं हमारे नन्हे मेहमान के स्वागत एवं नामकरण समारोह में।`,
    },
    reveal: {
      heading: 'देखिए हमारी नन्ही सी खुशी',
      caption: 'नन्हे कदमों से आई है खुशियों की बहार',
    },
    parents: {
      heading: 'मम्मी-पापा की सबसे प्यारी खुशी',
      message:
        'हमारी दुनिया में एक नई मुस्कान जुड़ी है। इस अनमोल खुशी के उत्सव में आपकी उपस्थिति हमारे लिए अत्यंत विशेष होगी।',
    },
    family: {
      text: `आपकी शुभकामनाएँ और आशीर्वाद ${littleOur} के उज्ज्वल भविष्य के लिए अनमोल हैं।`,
    },
    invitation: [
      `ईश्वर की असीम कृपा से हमारे परिवार में एक ${little} का आगमन हुआ है।`,
      'इस शुभ अवसर पर आयोजित स्वागत एवं नामकरण समारोह में आप सपरिवार सादर आमंत्रित हैं।',
      'आपकी गरिमामयी उपस्थिति, स्नेह एवं आशीर्वाद से यह शुभ अवसर और भी मंगलमय होगा।',
    ],
    final: {
      sub: `${littleOur} को अपना प्यार और आशीर्वाद देने अवश्य पधारें।`,
      from: `${surname} परिवार की ओर से सस्नेह निमंत्रण`,
    },
  };
}

export type Content = ReturnType<typeof buildContent>;

/** 'श्रीमती नेहा शर्मा' → 'नेहा' */
function firstName(full: string) {
  const parts = full.split(/\s+/).filter((p) => !['श्री', 'श्रीमती', 'सुश्री', 'डॉ.', 'Shri', 'Smt.'].includes(p));
  return parts[0] ?? full;
}

/** First grapheme (handles Devanagari matras), e.g. 'आराध्या' → 'आ' */
function firstLetter(s: string) {
  const name = firstName(s);
  const Seg = (Intl as unknown as { Segmenter?: new (l: string, o: object) => { segment(t: string): Iterable<{ segment: string }> } }).Segmenter;
  if (Seg) {
    for (const g of new Seg('hi', { granularity: 'grapheme' }).segment(name)) return g.segment;
  }
  return name.slice(0, 1);
}
