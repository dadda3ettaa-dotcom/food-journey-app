import { Archetype, ArchetypeId } from '../types';

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  lion: {
    id: 'lion',
    name: 'Löwe',
    emoji: '🦁',
    germanName: 'Löwe',
    themeColor: '#D97706', // Warmes Gold / Amber
    themeBg: '#FFFBEB',
    themeBorder: '#FCD34D',
    rhythmDescription: 'Früher und strukturierter Rhythmus',
    signals: [
      'Frühe Energie und schneller Start am Morgen',
      'Hohe Planbarkeit und Vorfreude auf Mahlzeiten',
      'Früher und klarer Hunger in der ersten Tageshälfte',
      'Leistungsfenster vor allem am Vormittag'
    ],
    characteristic: 'Strukturierter, früher Tagesablauf mit klar abgrenzbaren Phasen. Mahlzeiten sind oft feste Ankerpunkte im Tag.',
    detailedAnalysis: 'Heute haben sich bei dir klare Strukturen, ein aktiver Start und deutliche Hunger- oder Energieimpulse in der ersten Tageshälfte gezeigt.',
    recommendations: [
      'Plane nahrhafte Mahlzeiten im Voraus, um deinen frühen Energiepeak zu unterstützen.',
      'Achte darauf, auch am Nachmittag kurze Atempausen zu machen, wenn der frühe Schwung abklingt.',
      'Beobachte, wie sich ein leichtes Abendessen auf deine morgendliche Energie auswirkt.'
    ],
    habitFocus: 'Konstante Vormittagsenergie und bewusstes Ausklingen am Abend.'
  },
  bear: {
    id: 'bear',
    name: 'Bär',
    emoji: '🐻',
    germanName: 'Bär',
    themeColor: '#059669', // Waldgrün / Sanftes Smaragd
    themeBg: '#ECFDF5',
    themeBorder: '#6EE7B7',
    rhythmDescription: 'Mittlerer und alltagstauglicher Rhythmus',
    signals: [
      'Beste Energie rund um die Tagesmitte',
      'Regelmäßiger, verlässlicher Tagesablauf',
      'Gute Anpassung an gesellschaftliche Standardzeiten',
      'Gleichmäßiger Appetit bei geregelten Pausen'
    ],
    characteristic: 'Ausgeglichener Rhythmus im Einklang mit dem natürlichen Tageslauf. Reagiert positiv auf feste Zeiten und bewusste Mahlzeiten.',
    detailedAnalysis: 'Dein heutiger Tag zeichnete sich durch einen alltagstauglichen, mittleren Rhythmus aus. Energie und Hunger verteilten sich stabil über den Tag.',
    recommendations: [
      'Nutze dein stabiles Mittagsfenster für eine echte, bildschirmfreie Pause.',
      'Plane einfache, nährstoffreiche Mahlzeiten, die deinen gleichmäßigen Rhythmus stützen.',
      'Beobachte, wie Ruhephasen am Nachmittag dir helfen, den Abend entspannt zu genießen.'
    ],
    habitFocus: 'Regelmäßige Grundversorgung und bewusste Pausenanker im Alltag.'
  },
  wolf: {
    id: 'wolf',
    name: 'Wolf',
    emoji: '🐺',
    germanName: 'Wolf',
    themeColor: '#7C3AED', // Warmes Violett
    themeBg: '#F5F3FF',
    themeBorder: '#C4B5FD',
    rhythmDescription: 'Später und kreativer Rhythmus',
    signals: [
      'Späte Energie und kreative Phasen am Abend',
      'Schwieriger Morgen oder langsames In-Gang-Kommen',
      'Späte Konzentration und Lust auf Knabbern beim Ausklingen',
      'Verstärkter Appetit in den späteren Stunden'
    ],
    characteristic: 'Kreativ und aktiv in den späten Tagesstunden. Benötigt oft sanfte Übergänge am Morgen und findet erst abends zur vollen Entfaltung.',
    detailedAnalysis: 'Deine heutigen Antworten deuten auf einen späteren Rhythmus hin: Der Morgen brauchte Anlauf, während am späten Nachmittag oder Abend mehr Energie und Genussimpulse vorhanden waren.',
    recommendations: [
      'Gib dir morgens Zeit ohne Druck und starte mit sanften Routinen.',
      'Bereite für späte Arbeits- oder Serienabende bewusste, genussvolle Snack-Optionen vor.',
      'Beobachte den Unterschied zwischen spätem Hunger, Gemütlichkeit und Gewohnheit.'
    ],
    habitFocus: 'Sanfter Morgenstart und achtsame Abendrituale ohne Reizüberflutung.'
  },
  fox: {
    id: 'fox',
    name: 'Fuchs',
    emoji: '🦊',
    germanName: 'Fuchs',
    themeColor: '#EA580C', // Lebendiges Orange
    themeBg: '#FFF7ED',
    themeBorder: '#FDBA74',
    rhythmDescription: 'Sensibler und wechselnder Rhythmus',
    signals: [
      'Schwankende Energie und viele parallele Gedanken',
      'Stressanfällige Übergänge zwischen Terminen und Aufgaben',
      'Wechsel zwischen tiefem Fokus und schneller Ablenkung',
      'Essen oft als Brücke zur Entspannung oder spontanes Ritual'
    ],
    characteristic: 'Aufmerksam und feinfühlig gegenüber äußeren Reizen und Stress. Essen wird oft unbewusst als Pause, Belohnung oder Erdung genutzt.',
    detailedAnalysis: 'Heute haben deine Antworten gezeigt, dass viele Eindrücke, gedankliche Aktivität oder Zeitdruck deinen Tag begleitet haben. Essen dient dir oft als wichtiger Moment zum Herunterfahren.',
    recommendations: [
      'Plane vor Mahlzeiten einen 1-minütigen Übergangsmoment zum Durchatmen ein.',
      'Probiere ein Essen ohne parallelen Bildschirmkonsum aus.',
      'Beobachte wertfrei, wie Stress und Termine dein Essgefühl beeinflussen.'
    ],
    habitFocus: 'Atempausen vor Mahlzeiten und bewusste Übergänge zwischen Tun und Essen.'
  }
};
