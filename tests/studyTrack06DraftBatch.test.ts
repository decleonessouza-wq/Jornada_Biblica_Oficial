import { JOURNEY_20_30_REQUIRED_SECTION_TYPES } from "../src/studies/content/studyContentValidator";
import {
  TRACK_06_DRAFT_BATCH_EDITORIAL_STATUS,
  TRACK_06_DRAFT_BATCH_PROFILE,
  TRACK_06_DRAFT_BATCH_PUBLISHED,
  TRACK_06_DRAFT_BATCH_RUNTIME_ELIGIBLE,
  TRACK_06_DRAFT_BATCH_VALIDATOR_DEBT,
  track06DraftBatchEditorialSources,
  track06DraftBatchPackage,
} from "../src/studies/content/track06DraftBatch";

const expectedSourceIdentity = new Map<number, readonly [string, string, number, number]>([
  [
    1,
    [
      "07A4DE03BB98DE395C91982C0A2DCEEB7B9703FB5142B4428042AD31041E272F",
      "8FC35925D661224851BD7EAF780BE76978F22850F38B7FBCC23615713081C24C",
      950198,
      11029
    ]
  ],
  [
    2,
    [
      "43348F22C5CAD63DF36F2D236E9B55BEC1BB9B4ADB5C91C471D969563C3E8650",
      "1DDDEEBFF142059799E6B4D69DB20C0845F08EDE981FF503136439692AA3A2DE",
      949213,
      9778
    ]
  ],
  [
    3,
    [
      "BDEBC04A1EEC21AE862A8C2A373F2BF6FD80EDB92003D29946D8FFC7225569AE",
      "37F4E8EDAAFEB55C674C2CB3C9999553CE27498D0C22BCC22BFB347ED3B1F49E",
      949564,
      10101
    ]
  ],
  [
    4,
    [
      "D875295FC5A07FE37E2F6CD90DC1F54CAF1CEF69C0AB3A33B06906E5BC9CDED3",
      "4C71B8476C35F44C27BF920E5003073D7DB07C26D816836BF73176F19E3286F5",
      949734,
      10135
    ]
  ],
  [
    5,
    [
      "105FD0C51E79DAC1B551BC311C63C01A157734AA41A16EB991EDCED6303CAB1A",
      "A40350AB9E339CF20C462DADB255066407643F869C0827B164C547B02F7DAEC5",
      950934,
      11300
    ]
  ],
  [
    6,
    [
      "D1D3EAD5533FB3BDF4433F76AFD7DEA9C3443362CADC8264EB4512B9CC8F7442",
      "271404032A2F648C0AF1B03E76D60A8070FB692604683603114601A280BF2A0C",
      950187,
      10607
    ]
  ],
  [
    7,
    [
      "67C29A52E4FDA825F42052F6A2910AA8A20ECDDCFF3A2D939A19D6FADFCCBF2B",
      "55D937E99D68ADE356B9C131AB70697A830274B37BFC21BE52B4DAE2012583AB",
      949953,
      10046
    ]
  ],
  [
    8,
    [
      "FB86D5CDC7FD4A742B09AC4120C33C0FFA7D506EBA0D9B9C3E04A919D13E734C",
      "2DBDFA536868DD078D169977842EF69173987D588E264E4575B852AC661A3B6C",
      949760,
      10006
    ]
  ],
  [
    9,
    [
      "370A5E7EEA7DDDA430B3C34FF8CFC0B5D2A5D2FA79C4B4AA0C43355B1BFA91B8",
      "614BA38DE5BA522F6170C80BBF8C74ABAB57643788A98025D32CCF6FB67DF3B2",
      950051,
      10061
    ]
  ],
  [
    10,
    [
      "AEC32A61C495C14CEF52B5D06270A092508616683D2FAF45AF0AAB784B81273F",
      "AD6BD813C64F36511EC17BB36FF7C82134AE3246AC2C81F987440FDC801AB102",
      950276,
      10269
    ]
  ]
]);
const expectedTitleByStudy = new Map<number, string>([
  [
    1,
    "Vida financeira: quando o dinheiro deixa de ser senhor e volta a ser ferramenta"
  ],
  [
    2,
    "Juventude: ser de Cristo quando o mundo disputa sua identidade"
  ],
  [
    3,
    "Vida familiar: quando Cristo entra dentro de casa"
  ],
  [
    4,
    "Vida profissional: trabalhar sem fazer do trabalho um deus"
  ],
  [
    5,
    "Fé: muito mais do que acreditar que Deus existe"
  ],
  [
    6,
    "Vida digital: quem está discipulando minha mente?"
  ],
  [
    7,
    "Vícios e compulsões: quando aquilo que eu uso começa a me dominar"
  ],
  [
    8,
    "Solidão e pertencimento: quando estou cercado de pessoas e ainda me sinto sozinho"
  ],
  [
    9,
    "Discernimento espiritual: nem tudo que parece de Deus vem de Deus"
  ],
  [
    10,
    "Cansaço e esperança: quando a alma diz “não aguento mais”"
  ]
]);
const expectedSlugByStudy = new Map<number, string>([
  [
    1,
    "vida-financeira"
  ],
  [
    2,
    "juventude"
  ],
  [
    3,
    "vida-familiar"
  ],
  [
    4,
    "vida-profissional"
  ],
  [
    5,
    "fe"
  ],
  [
    6,
    "vida-digital"
  ],
  [
    7,
    "vicios-e-compulsoes"
  ],
  [
    8,
    "solidao-e-pertencimento"
  ],
  [
    9,
    "discernimento-espiritual"
  ],
  [
    10,
    "cansaco-e-esperanca"
  ]
]);
const coreSourceProvenTypes = [
  "GOLDEN_TEXT","PRACTICAL_TRUTH","BIBLE_READING","BEFORE_UNDERSTANDING","READ","OBSERVE","UNDERSTAND","APPLY",
  "JOURNEY_TAKEAWAY","PRACTICE_TODAY","REFLECTION_QUESTIONS","PRAYER","KEEP","GROUP_MODE","CONTINUE_JOURNEY","REFERENCES",
] as const;

describe("P17-P2-A28-A1 Track 06 controlled DRAFT materialization", () => {
  it("materializes exactly ten real Track 06 studies inside the authorized DRAFT envelope", () => {
    expect(TRACK_06_DRAFT_BATCH_PROFILE).toBe("JOURNEY_20_30_V1");
    expect(TRACK_06_DRAFT_BATCH_EDITORIAL_STATUS).toBe("DRAFT");
    expect(TRACK_06_DRAFT_BATCH_PUBLISHED).toBe(false);
    expect(TRACK_06_DRAFT_BATCH_RUNTIME_ELIGIBLE).toBe(false);
    expect(track06DraftBatchPackage.tracks).toHaveLength(1);
    expect(track06DraftBatchPackage.tracks[0]?.id).toBe("track-06");
    expect(track06DraftBatchPackage.tracks[0]?.published).toBe(false);
    expect(track06DraftBatchPackage.studies).toHaveLength(10);
    expect(track06DraftBatchPackage.studies.map((study) => study.number)).toEqual(Array.from({ length: 10 }, (_, index) => index + 1));
    expect(track06DraftBatchPackage.studies.every((study) => study.trackId === "track-06" && study.published === false)).toBe(true);
  });
  it("locks the exact ten authorized PDF and R6 extracted-text identities", () => {
    expect(track06DraftBatchEditorialSources).toHaveLength(10);
    for (const source of track06DraftBatchEditorialSources) {
      const expected = expectedSourceIdentity.get(source.studyNumber);
      expect(expected).toBeDefined();
      expect(Array.isArray(expected)).toBe(true);
      expect(expected).toHaveLength(4);
      expect(source.sourceSha256).toBe(expected?.[0]);
      expect(source.sourceTextSha256).toBe(expected?.[1]);
      expect(source.sourceBytes).toBe(expected?.[2]);
      expect(source.sourceTextBytes).toBe(expected?.[3]);
      expect(source.sourcePageCount).toBe(7);
      expect(source.editorialStatus).toBe("DRAFT");
      expect(source.published).toBe(false);
      expect(source.runtimeEligible).toBe(false);
      expect(source.technicalProfile).toBe("JOURNEY_20_30_V1");
    }
  });
  it("preserves exact IDs, slugs, titles and Study 01-10 continuity", () => {
    const studies=[...track06DraftBatchPackage.studies].sort((a,b)=>a.number-b.number);
    expect(new Set(studies.map((study)=>study.id)).size).toBe(10);
    expect(new Set(studies.map((study)=>study.slug)).size).toBe(10);
    for(let index=0;index<studies.length;index+=1){
      const study=studies[index]!;
      expect(study.id).toBe(`track-06-study-${String(index+1).padStart(2,"0")}`);
      expect(study.title).toBe(expectedTitleByStudy.get(study.number));
      expect(study.slug).toBe(expectedSlugByStudy.get(study.number));
      expect(study.nextStudyId).toBe(index<9?`track-06-study-${String(index+2).padStart(2,"0")}`:null);
    }
  });
  it("preserves only source-proven core section roles and keeps ownership/order fail-closed", () => {
    for(const study of track06DraftBatchPackage.studies){
      const sections=track06DraftBatchPackage.sections.filter((section)=>section.studyId===study.id).sort((a,b)=>a.order-b.order);
      expect(sections.length).toBeGreaterThanOrEqual(16);
      expect(sections.length).toBeLessThanOrEqual(17);
      expect(new Set(sections.map((section)=>section.id)).size).toBe(sections.length);
      expect(sections.map((section)=>section.order)).toEqual(Array.from({length:sections.length},(_,index)=>index+1));
      for(const type of coreSourceProvenTypes) expect(sections.filter((section)=>section.type===type)).toHaveLength(1);
      expect(sections.filter((section)=>String(section.type)==="REFLECT")).toHaveLength(0);
      expect(sections.filter((section)=>String(section.type)==="CONNECT")).toHaveLength(0);
    }
  });
  it("preserves four REFLITA markers inside APPLY without inventing literal APLIQUE or REFLECT", () => {
    for(const study of track06DraftBatchPackage.studies){
      const apply=track06DraftBatchPackage.sections.find((section)=>section.studyId===study.id&&section.type==="APPLY");
      expect(apply).toBeDefined();
      const textualBlocks=apply?.blocks.filter((block)=>"text"in block&&typeof block.text==="string")??[];
      expect(textualBlocks.filter((block)=>"text"in block&&/^REFLITA(?:\s|$)/i.test(block.text))).toHaveLength(4);
      expect(textualBlocks.filter((block)=>"text"in block&&/^APLIQUE(?:\s|$)/i.test(block.text))).toHaveLength(0);
    }
  });
  it("preserves Entenda/Cuidado, closing Verdade Prática, Pratique hoje and Para refletir", () => {
    for(const study of track06DraftBatchPackage.studies){
      const sections=track06DraftBatchPackage.sections.filter((section)=>section.studyId===study.id);
      const understand=sections.find((section)=>section.type==="UNDERSTAND");
      const takeaway=sections.find((section)=>section.type==="JOURNEY_TAKEAWAY");
      const practice=sections.find((section)=>section.type==="PRACTICE_TODAY");
      const reflection=sections.find((section)=>section.type==="REFLECTION_QUESTIONS");
      expect(understand).toBeDefined();
      expect(understand?.blocks.filter((block)=>"text"in block&&typeof block.text==="string"&&/^ENTENDA(?:\s|$)/i.test(block.text)).length).toBeGreaterThanOrEqual(3);
      expect(understand?.blocks.some((block)=>"text"in block&&typeof block.text==="string"&&/^CUIDADO PARA NÃO CONFUNDIR$/i.test(block.text))).toBe(true);
      expect(takeaway?.blocks.some((block)=>"text"in block&&typeof block.text==="string"&&/^Verdade Prática$/i.test(block.text))).toBe(true);
      expect(practice).toBeDefined();
      expect(reflection).toBeDefined();
    }
  });
  it("records the validator debt instead of fabricating a REFLECT section", () => {
    expect(TRACK_06_DRAFT_BATCH_VALIDATOR_DEBT).toBe("JOURNEY_20_30_V1_REQUIRES_REFLECT_BUT_TRACK06_SOURCE_PRESERVES_REFLITA_INSIDE_APPLY");
    expect(JOURNEY_20_30_REQUIRED_SECTION_TYPES).toContain("REFLECT");
    expect(track06DraftBatchPackage.sections.some((section)=>String(section.type)==="REFLECT")).toBe(false);
  });
  it("keeps Study 10 terminal", () => {
    const study10=track06DraftBatchPackage.studies.find((study)=>study.id==="track-06-study-10");
    expect(study10).toBeDefined();
    expect(study10?.nextStudyId).toBeNull();
  });
});
