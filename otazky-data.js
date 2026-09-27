/*
========================================
ZLATÁ UDICE 2026 – OTÁZKY
========================================

Celkem: 264 otázek

1. Přírodovědné znalosti – 83
2. Chov ryb – 62
3. Zákon o rybářství – 51
4. Stanovy ČRS – 17
5. Znalosti z rybolovné techniky – 31
6. Závodní lov ryb udicí – 20

Zvuky:
otazky/otazka-1-001.mp3
otazky/odpoved-1-001-1.mp3
atd.
*/

const questionSections = {
  1: "Přírodovědné znalosti",
  2: "Chov ryb",
  3: "Zákon o rybářství",
  4: "Stanovy ČRS",
  5: "Znalosti z rybolovné techniky",
  6: "Závodní lov ryb udicí – Zlatá udice"
};


/*
Každá otázka je zapsaná:

[
  číslo sekce,
  číslo otázky,
  text otázky,
  odpověď 1,
  odpověď 2,
  odpověď 3,
  číslo správné odpovědi
]
*/

const questionsRaw = [

/* ========================================
   1. PŘÍRODOVĚDNÉ ZNALOSTI
======================================== */

[1,1,
"Která z následujících ryb má typické spodní postavení úst",
"pstruh obecný",
"jelec tloušť",
"jeseter malý",
3],

[1,2,
"Která z následujících druhů ryb má střední postavení úst",
"štika obecná",
"ouklej obecná",
"podoustev říční",
1],

[1,3,
"Z uvedené skupiny ryb označ ty, které mají tukovou ploutvičku",
"vranka obecná, slunečnice pestrá, perlín ostrobřichý, střevle potoční",
"sumeček americký, losos obecný, hlavatka obecná, lipan podhorní",
"piskoř pruhovaný, mřenka mramorovaná, cejn velký, štika obecná",
2],

[1,4,
"Která z uvedených lososovitých ryb má skvrnami pokrytou ocasní ploutev",
"pstruh obecný",
"pstruh duhový",
"siven americký",
2],

[1,5,
"Který z uvedených jelců má vypouklý tvar hřbetní a řitní ploutve",
"jelec tloušť",
"jelec jesen",
"jelec proudník",
1],

[1,6,
"Mřenka mramorovaná má ocasní ploutev",
"vykrojenou",
"zaoblenou",
"uťatou",
3],

[1,7,
"Obnovují se rybí šupiny po ztrátě",
"někdy",
"ne",
"ano, ale neodrážejí stáří a růst ryby",
3],

[1,8,
"Která z následujících ryb má šupiny seřazené v podélných řadách nad sebou",
"perlín ostrobřichý",
"štika obecná",
"lipan podhorní",
3],

[1,9,
"Které z následujících ryb nemají tělo kryto šupinami",
"úhoř říční, piskoř pruhovaný, siven americký",
"sumeček americký, sumec velký, vranka obecná",
"mník jednovousý, lín obecný, karas obecný",
2],

[1,10,
"Které čeledi našich ryb mají požerákové zuby",
"lososovité",
"štikovité",
"kaprovité",
3],

[1,11,
"Ve které části rybího trupu je uloženo nejvíce svaloviny",
"na hřbetě",
"na břiše",
"na hlavě",
1],

[1,12,
"Která z našich ryb má největší játra – v poměru k velikosti těla ryby",
"štika obecná",
"mník jednovousý",
"sumec velký",
2],

[1,13,
"Kde leží u ryb ledviny",
"vedle jater",
"mezi kličkami střev",
"těsně pod páteří",
3],

[1,14,
"Čím jsou chráněny žábry před poškozením",
"skřelemi",
"šupinami",
"kůží",
1],

[1,15,
"K čemu slouží žaberní aparát ryb",
"k okysličování krve",
"k rozmělnění potravy",
"k pohybu",
1],

[1,16,
"K čemu slouží plynový měchýř",
"k dýchání v nouzi",
"umožňuje pohyb v různých hloubkách vodního sloupce",
"k trávení",
2],

[1,17,
"Kde je tlak v plynovém měchýři větší",
"v hlubokých vrstvách vody",
"v povrchových vrstvách vody",
"v proudící vodě",
1],

[1,18,
"Která z našich ryb má oko chráněno dvojitou rohovkou",
"úhoř říční",
"mník jednovousý",
"vranka obecná",
3],

[1,19,
"Co je to Hallerův zvonek",
"součást sluchového ústrojí ryb",
"zvláštní vaz, který slouží k posunu čočky v oku",
"zařízení, oznamující konec výlovu",
2],

[1,20,
"Mají ryby chuť",
"ano",
"ne",
"jen ryby dravé",
1],

[1,21,
"Postranní čára je",
"pohlavní rozlišovací znak",
"dotykový smyslový orgán",
"pomocný dýchací orgán",
2],

[1,22,
"Která kaprovitá ryba má na tlamě masité vousky",
"karas obecný",
"ouklej obecná",
"lín obecný",
3],

[1,23,
"Co jsou to gonády ryb",
"hřbetní paprsky",
"vyměšovací orgány",
"pohlavní orgány",
3],

[1,24,
"Co je to hypofýza",
"část sluchového ústrojí",
"podvěsek mozkový",
"virové onemocnění ryb",
2],

[1,25,
"Která z následujících dvojic ryb pečují o své jikry i po výtěru",
"sumec velký, sumeček americký",
"lipan podhorní, siven americký",
"kapr obecný, karas obecný",
1],

[1,26,
"Která z následujících ryb se rozmnožuje jen 1 x v životě, ale s největším počtem jiker",
"cejn velký",
"jeseter malý",
"úhoř říční",
3],

[1,27,
"Kolik druhů ryb žije v našich vodách (v ČR)",
"10 - 20",
"30 - 40",
"50 a více",
3],

[1,28,
"Ve kterém oceánu se rozmnožuje úhoř říční",
"Atlantský",
"Tichý",
"Indický",
1],

[1,29,
"Která ryba, žijící v našich vodách, patří do čeledi treskovitých",
"sumeček americký",
"mník jednovousý",
"sekavec podunajský",
2],

[1,30,
"Které části rybího těla slouží k určení stáří",
"ploutve",
"vousky",
"šupiny",
3],

[1,31,
"Mění se teplota rybího těla s teplotou vody",
"ano",
"ne",
"zůstává stejná",
1],

[1,32,
"Která kaprovitá ryba má typicky červenou duhovku oka",
"kapr obecný",
"bolen dravý",
"plotice obecná",
3],

[1,33,
"Která z ryb čeledi kaprovitých se v dospělosti živí rybami",
"karas stříbřitý",
"jelec proudník",
"bolen dravý",
3],

[1,34,
"Vranka obecná se pohybuje poskoky (střelkovitě). Proč neplave jako ostatní ryby",
"chybí jí plynový měchýř",
"nemá všechny ploutve",
"chybí jí postranní čára",
1],

[1,35,
"Charakteristická ryba pro proudné vody je",
"lín obecný",
"blatňák tmavý",
"lipan podhorní",
3],

[1,36,
"Co je to minoha",
"larva vodní vážky",
"larva mihule potoční",
"larva chrostíka",
2],

[1,37,
"Zelené vodní rostliny vyrábějí kyslík",
"jen ve dne",
"jen v noci",
"ani ve dne, ani v noci",
1],

[1,38,
"Mezi plankton patří",
"larva chrostíka velkého, potápník vroubený",
"škeble rybničná, perlorodka říční",
"buchanka, perloočka",
3],

[1,39,
"Mezi bentos patří",
"červené larvy pakomára kouřového, beruška vodní",
"mřenka mramorovaná",
"dafnie",
1],

[1,40,
"Kořen které z následujících rostlin se využívá v lékařství",
"zevar jednoduchý",
"šípatka střelolistá",
"puškvorec obecný",
3],

[1,41,
"Čím se liší škeble rybničná od velevruba malířského",
"způsobem rozmnožování",
"barvou",
"tvarem zámku lastury",
3],

[1,42,
"Hadovitý tvar těla má",
"jelec tloušť",
"cejn velký",
"piskoř pruhovaný",
3],

[1,43,
"Které párové (sudé) ploutve má úhoř říční",
"břišní",
"prsní",
"hřbetní",
2],

[1,44,
"Pro kterou z uvedených ryb je charakteristické zadní postavení hřbetní ploutve",
"kapr obecný",
"štika obecná",
"siven americký",
2],

[1,45,
"Které z uvedených ryb scházejí břišní ploutve",
"slunečnici pestré",
"mníku jednovousému",
"úhoři říčnímu",
3],

[1,46,
"Která z těchto ryb má zpravidla více slizu na povrchu svého těla",
"bolen dravý",
"okoun říční",
"cejn velký",
3],

[1,47,
"Která naše ryba nemá šupiny vůbec vyvinuté",
"mník jednovousý",
"vranka obecná",
"slunečnice pestrá",
2],

[1,48,
"Která naše ryba má šupiny i na spánkové části hlavy",
"kapr obecný",
"mník jednovousý",
"štika obecná",
3],

[1,49,
"U které naší kaprovité ryby je červená barva většiny ploutví jedním z důležitých rozpoznávacích znaků",
"jelec jesen",
"perlín ostrobřichý",
"plotice obecná",
2],

[1,50,
"Která naše ryba má šupiny tak hluboce zasazené ve škáře, že se její tělo zdá na první pohled bez šupin",
"sumec velký",
"úhoř říční",
"pstruh obecný",
2],

[1,51,
"Radličnou kost najdeme u",
"pstruha obecného",
"okouna říčního",
"kapra obecného",
1],

[1,52,
"Požerákové zuby mají ryby",
"kaprovité a lososovité",
"sekavcovité a kaprovité",
"jen ryby kaprovité",
2],

[1,53,
"Která z našich ryb nemá zcela kostěnou páteř",
"úhoř říční",
"mník jednovousý",
"jeseter malý",
3],

[1,54,
"Má bolen dravý žaludek",
"ano",
"ne",
"jen v dospělosti",
2],

[1,55,
"Jaká ryba má typickou černou skvrnu na hřbetní ploutvi",
"vranka obecná",
"bolen dravý",
"hlaváč černoústý",
3],

[1,56,
"Přídavné střevní dýchání má",
"úhoř říční",
"blatňák tmavý",
"piskoř pruhovaný",
3],

[1,57,
"Plynový měchýř nemají ryby",
"kaprovité",
"vrankovité",
"lososovité",
2],

[1,58,
"Zvětšením objemu plynů v plynovém měchýři ryba",
"stoupá",
"klesá",
"vyráží prudce vpřed",
1],

[1,59,
"Jestliže se u ryb s dvojitým plynovým měchýřem (kaprovité) zvětší objem v zadní části měchýře a ryba se při tom pohybuje vpřed, bude tato ryba plavat",
"šikmo vzhůru",
"prudce vpřed",
"šikmo dolů",
3],

[1,60,
"Kde je umístěna postranní čára ryby",
"podél hřbetu ryby",
"podél břišní části těla ryby",
"je vedena středem boků ryby",
3],

[1,61,
"Kolik vousků má kapr obecný",
"2",
"4",
"6",
2],

[1,62,
"Kolik vousků má sumeček americký",
"8",
"10",
"12",
1],

[1,63,
"Kolik vousků má piskoř pruhovaný",
"6",
"8",
"10",
3],

[1,64,
"Kolik vousků má sumec velký",
"4",
"6",
"8",
2],

[1,65,
"Která z uvedených ryb se při vyhledávání potravy orientuje především zrakem",
"sumec velký",
"mník jednovousý",
"štika obecná",
3],

[1,66,
"Která z uvedených ryb se při vyhledávání potravy orientuje především čichem, hmatem a chutí",
"okoun říční",
"kapr obecný",
"pstruh obecný",
2],

[1,67,
"2 vousky má tato dvojice ryb",
"hrouzek obecný a ostroretka stěhovavá",
"hrouzek obecný a lín obecný",
"mřenka mramorovaná a ostroretka stěhovavá",
2],

[1,68,
"4 vousky má tato trojice ryb",
"parma obecná, jeseter malý a kapr obecný",
"parma obecná, sekavec podunajský a kapr obecný",
"jeseter malý, mřenka mramorovaná a lín obecný",
1],

[1,69,
"Mihule říční patří mezi",
"úhořovité",
"paryby",
"kruhoústé",
3],

[1,70,
"Ježdík obecný patří do čeledi ryb",
"kaprovité",
"sekavcovité",
"okounovité",
3],

[1,71,
"Amur bílý patří do čeledi ryb",
"kaprovité",
"lososovité",
"okounovité",
1],

[1,72,
"Bolen dravý patří do čeledi ryb",
"kaprovité",
"štikovité",
"okounovité",
1],

[1,73,
"Která trojice ryb se v dospělosti živí převážně rybami",
"štika obecná, parma obecná a candát obecný",
"štika obecná, bolen dravý a candát obecný",
"štika obecná, okoun říční a ouklej obecná",
2],

[1,74,
"Která z trojice ryb je typická pro oblast pstruhového pásma",
"pstruh obecný, slunečnice pestrá a okounek pstruhový",
"pstruh obecný, vranka obecná a střevle potoční",
"okounek pstruhový, střevle potoční a vranka obecná",
2],

[1,75,
"Kdy je voda na rybníce průhlednější",
"na jaře",
"v létě",
"v zimě",
3],

[1,76,
"Splešťule blátivá patří mezi",
"roztoče",
"ploštice",
"červy",
2],

[1,77,
"Chobotnatka rybí patří mezi",
"roztoče",
"ploštice",
"kroužkovce",
3],

[1,78,
"Kapřivec plochý je",
"rybí parazit",
"kříženec kapra obecného a jelce tlouště",
"vyřazený generační kapr obecný",
1],

[1,79,
"Chrostíci patří mezi",
"korýše",
"červy",
"hmyz",
3],

[1,80,
"Larva potápníka vroubeného je",
"dravá",
"býložravá",
"všežravá",
1],

[1,81,
"Cílem vápnění rybníků je",
"snížení kyselosti vody",
"zvýšení kyselosti vody",
"omezení růstu rostlin",
1],

[1,82,
"Čím se převážně živí plotice obecná",
"vodními rostlinami",
"hmyzem spadaným na hladinu",
"zooplanktonem a zoobentosem",
3],

[1,83,
"Silně invazivní a nežádoucí druh ryby, který se v posledních letech rozšiřuje převážně na řece Labi se nazývá",
"tolstolobik bílý",
"hlaváč černoústý",
"sumeček africký",
2],
  /* ========================================
   2. CHOV RYB
======================================== */

[2,1,
"Rybáři mnohdy připisují štice velké množství zkonzumovaných ryb. Kolik ryb spotřebuje štika na to, aby přirostla na váze o 1 kg",
"40 - 55 kg",
"10 - 15 kg",
"3 - 7 kg",
3],

[2,2,
"Jednou z atraktivních ryb je úhoř říční. Do našich vod jej dovážíme jako",
"jikry (oční body)",
"úhoře těsně pod zákonitou míru",
"tříleté, ještě nevybarvené úhoře - monté",
3],

[2,3,
"Lipan podhorní se v dospělosti převážně živí",
"porosty zelených řas na dně",
"larvami vodního hmyzu, zejména chrostíků a občas dospělým hmyzem",
"drobnou bílou rybou a měkkými vodními porosty",
2],

[2,4,
"Plankton slouží rybám jako",
"úkryt",
"ke kladení jiker",
"jako potrava",
3],

[2,5,
"Co je bentos",
"drobní živočichové rozptýlení ve vodním sloupci",
"živočichové dna",
"hmyz kladoucí svá vajíčka do vody",
2],

[2,6,
"Na čem nejvíce záleží doba tření kaprovitých ryb",
"na obsahu kyslíku ve vodě",
"na množství potravy",
"na teplotě vody",
3],

[2,7,
"Ve kterých ročních obdobích se třou lososovité ryby",
"podzim a jaro",
"léto",
"zima",
1],

[2,8,
"U nás se běžně uměle vytírají",
"úhoř říční",
"pstruh duhový",
"slunečnice pestrá",
2],

[2,9,
"Urči jediné teplotní rozmezí, při kterém se úspěšně tře kapr obecný",
"10 - 14 °C",
"24 - 30 °C",
"16 - 20 °C",
3],

[2,10,
"Která z těchto ryb má nejméně jiker (50 - 100 ks)",
"piskoř pruhovaný",
"ouklej obecná",
"hořavka duhová",
3],

[2,11,
"Která z těchto ryb má nejvíce jiker",
"jeseter malý",
"štika obecná",
"mník jednovousý",
3],

[2,12,
"Která ryba se obvykle netře v měsíci květnu",
"cejn velký",
"siven americký",
"candát obecný",
2],

[2,13,
"Která z našich ryb klade jikry do žaberních systémů mlžů",
"piskoř pruhovaný",
"okounek pstruhový",
"hořavka duhová",
3],

[2,14,
"U kterých z níže uvedených ryb je v dospělosti možno kdykoliv rozpoznat mlíčáka od jikernačky pomocí velikosti břišních ploutví",
"lín obecný",
"kapr obecný",
"štika obecná",
1],

[2,15,
"K čemu slouží hypofýzace ryb",
"k dezinfekci ryb při napadení plísní",
"k urychlení přípravy k výtěru",
"k mezidruhovému křížení ryb",
2],

[2,16,
"Od které ryby se u nás vyskytují pouze jikernačky a tato ryba se tře s jinými druhy, aniž by vznikl kříženec",
"ostrucha křivočará",
"okounek pstruhový",
"karas stříbřitý",
3],

[2,17,
"Který z uvedených živočichů působí ztráty na plůdku",
"komár pisklavý",
"dafnie velká",
"potápník vroubený a jeho larvy",
3],

[2,18,
"Na přikrmování kapří násady nevyhovuje toto krmivo",
"starý chléb a pečivo",
"šrot",
"mletá slezina",
3],

[2,19,
"Z kterého stromu je nejvhodnější dřevo pro rybniční zařízení, která jsou zatopena vodou",
"smrk",
"dub",
"lípa",
2],

[2,20,
"Vrhací síť slouží především",
"pro odlov generačních ryb na malých potocích",
"k dolovení ryb v lovišti na konci výlovu",
"ke kontrolnímu odlovu",
3],

[2,21,
"Úrodnost rybníka zvyšujeme",
"letněním",
"vysazováním tvrdých porostů",
"úplným odbahněním",
1],

[2,22,
"Který druh ryb vysazujeme do kaprových rybníků různého typu jako doplňkovou rybu",
"perlín ostrobřichý",
"jelec tloušť",
"sumec velký",
3],

[2,23,
"Jaký je nejúčinnější způsob ničení tvrdých vodních porostů v rybníce",
"vypálit při zimování",
"po napuštění rybníka několikrát vysekat",
"vysadit odpovídající počet kachen",
1],

[2,24,
"Jak se nazývá rybník, ve kterém je přes zimu uložen plůdek nebo násada k jarnímu vysazení do rybníků",
"komorový",
"výtažný",
"Dubraviův",
1],

[2,25,
"Proč v zimě vysekáváme na stojatých vodních plochách otvory do ledu",
"aby se ryby mohly v zimě přikrmovat",
"pro vodní ptactvo",
"k odvětrání škodlivých plynů",
3],

[2,26,
"Jak se nazývá rybník, do kterého vysazujeme mateční kapry za účelem jejich vytření a získání plůdku",
"mateční",
"komorový",
"třecí",
3],

[2,27,
"Jak se nazývá rybník, ve kterém je uložen plůdek, abychom z něj získali násadu",
"úložný",
"Dubraviův",
"výtažný",
3],

[2,28,
"Jak hluboký má být třecí rybník",
"do 1 m",
"do 2 m",
"nad 3,5 m",
1],

[2,29,
"Generační ryby se pro výtěr slovují pomocí",
"mírně omamných látek",
"elektrického proudu",
"vrší a sítí",
3],

[2,30,
"Co je to denní stupeň",
"vzdálenost, kterou urazí mladý úhoř při tahu za den",
"součin, dle kterého je možno spočítat podle teploty vody čas vykulení plůdku z jiker",
"stupeň teploty vody, při níž ryba přezimuje a nepřijímá potravu",
2],

[2,31,
"Jaký je nejúčinnější způsob slovování násad nebo škodlivých ryb na malých potocích a říčkách",
"pomocí mírně omamných látek",
"pomocí speciálních podběráků",
"pomocí el. agregátu",
3],

[2,32,
"Příčinou náhlého objevování se ryb u hladiny rybníka, hlavně za teplejšího počasí (vylovené ryby mají žábry silně červené a překrvené) je",
"nedostatek kyslíku ve vodě za vysoké teploty",
"velké množství potravy",
"náhlé ochlazení vody",
1],

[2,33,
"Která nemoc postihuje častěji naše ryby",
"jarní virémie",
"malárie",
"chřipka",
1],

[2,34,
"Co je to řemenatka",
"virus způsobující zduření ledvin u pstruhů obecných",
"rybí cizopasník",
"bakterie způsobující skvrnitost ryb",
2],

[2,35,
"Jaká je voda v rybníce, jehož přítok protéká jehličnatým lesem",
"zásaditá",
"neutrální",
"kyselá",
3],

[2,36,
"Který živočich nám svojí přítomností ve vodě zaručuje, že jde o vodu zdraví nezávadnou (pitnou)",
"larvy chrostíka",
"beruška vodní",
"blešivec obecný",
3],

[2,37,
"Našim rybám se nejlépe daří ve vodě",
"silně kyselé",
"silně zásadité",
"neutrální",
3],

[2,38,
"Hojný výskyt berušky vodní signalizuje",
"vodu znečištěnou",
"vodu zdraví nezávadnou",
"vodu silně kyselou",
1],

[2,39,
"Ve kterém ročním období dojde díky anomálii vody k cirkulaci (promíchání) vody v nádrži",
"léto",
"podzim",
"zima",
2],

[2,40,
"Ve kterém století se objevují první rybníky v Čechách",
"ve 13. století",
"ve 14. století",
"v 15. století",
1],

[2,41,
"Ve kterých dvou stoletích se nejvíce rozšiřuje rybníkářství",
"18. a 19. století",
"15. a 16. století",
"14. a 15. století",
2],

[2,42,
"Kolik se odhaduje, že bylo v Čechách rybníků v době největšího rozmachu rybníkářství",
"20 000",
"50 000",
"78 000",
3],

[2,43,
"Kdo je náš nejznámější zakladatel rybníků",
"Václav Hájek z Libočan",
"Jakub Krčín z Jelčan",
"Jan Roháč z Dubé",
2],

[2,44,
"Za zavedení poloumělého výtěru kapra v 16. století se výrazně zasloužil",
"císař Ferdinand",
"italský rybníkář Campanula",
"Jan Dubravius",
3],

[2,45,
"Zlatá stoka (nejdelší rybniční napájecí stoka u nás) je dílem",
"Štěpánka Netolického",
"Jakuba Krčína z Jelčan",
"pana Jindřicha z Hradce",
1],

[2,46,
"Náš největší rybník Rožmberk byl dokončen v roce",
"1490",
"1590",
"1690",
2],

[2,47,
"Ve kterém století se rybníkářství střetlo s rozvojem polního hospodářství a došlo k neuváženému vysoušení rybníků",
"ve 14. století",
"koncem 16. století",
"v 18. století",
3],

[2,48,
"Kdo byl hlavním modernizátorem našeho rybníkářství v 19. století",
"Zdeněk Šimek",
"Josef Šusta",
"K. H. Borovský",
2],

[2,49,
"Kde je sídlo Střední rybářské školy",
"v Praze",
"v Českých Budějovicích",
"ve Vodňanech",
3],

[2,50,
"Kde je sídlo Výzkumného ústavu rybářského",
"v Třeboni",
"v Táboře",
"ve Vodňanech",
3],

[2,51,
"Kdo to byl prof. Antonín Frič",
"předseda prvního rybářského sportovního klubu v ČR",
"tvůrce rybniční soustavy v Třeboni",
"zakladatel umělého chovu lososovitých ryb u nás",
3],

[2,52,
"Nemocné ryby mají zvětšený obsah břicha, jsou malátné, hřbet mají ztmavlý, zježené šupiny, vystouplé oči, zarudlou vyhřezlou řiť. V tělní dutině se hromadí průhledná tekutina. Tato nemoc se nazývá",
"botulismus",
"jarní virémie",
"hostec",
2],

[2,53,
"Co je to kbel (požerák)",
"velká nádoba na přenášení rybího plůdku",
"zařízení sloužící k regulaci hladiny a vypouštění vody z rybníků",
"místo pod výpustí z rybníka",
2],

[2,54,
"Hlavní složka přirozené produkce rybníka je",
"plankton a bentos",
"krmné směsi",
"pšenice a kukuřice",
1],

[2,55,
"Co znamená „strojení rybníka“",
"práce odbahňovacích strojů na rybníku",
"příprava rybníka k výlovu",
"úprava rybniční hráze",
2],

[2,56,
"Mezi nežádoucí ryby v rybnících patří zpravidla",
"lín obecný",
"amur bílý",
"střevlička východní",
3],

[2,57,
"Rybníky ve vyšších nadmořských výškách jsou",
"více úživné",
"méně úživné",
"stejně úživné jako v nížinách",
2],

[2,58,
"Tygří rybou nazýváme",
"velkého candáta obecného",
"zvláštně obarvenou štiku",
"křížence pstruha obecného a sivena amerického",
3],

[2,59,
"Zkratka „Ca“ se v rybářství používá jako",
"označení pro vody s velkým obsahem vápníku",
"zkratka názvu pro cejna velkého",
"zkratka názvu pro candáta obecného",
3],

[2,60,
"U nebeského rybníku je zdroj vody",
"pramen",
"srážky",
"přítok",
2],

[2,61,
"V našich podmínkách běžně trvá produkce tržního kapra o váze 2-3 kilogramy",
"3-4 roky",
"1-2 roky",
"6 let",
1],

[2,62,
"Tolstolobika a amura označujeme jako ryby",
"čínské",
"nežádoucí",
"býložravé",
1],
  /* ========================================
   3. ZÁKON O RYBÁŘSTVÍ
======================================== */

[3,1,
"Jak rozdělujeme naše revíry z hlediska zákona o rybářství",
"pstruhové a mimopstruhové",
"tekoucí a stojaté",
"svazové a státního rybářství",
1],

[3,2,
"Rybářský lístek vydává",
"místní organizace Českého rybářského svazu",
"obecní úřad obce s rozšířenou působností",
"ministerstvo zemědělství",
2],

[3,3,
"Která z uvedených ryb je hájena v měsíci září",
"štika obecná",
"siven americký",
"pstruh obecný",
3],

[3,4,
"Co udělám s ulovenou štikou obecnou na pstruhovém revíru 30. 5.",
"nesmím ji vrátit zpět do pstruhového revíru",
"vrátím ji zpět do revíru",
"mohu si ji ponechat, pokud má lovnou míru",
1],

[3,5,
"Která z níže uvedených ryb má stanovenou nejmenší lovnou míru",
"lín obecný",
"pstruh obecný",
"jelec jesen",
1],

[3,6,
"Která z uvedených ryb má největší stanovenou lovnou míru na mimopstruhovém revíru",
"amur bílý",
"hlavatka podunajská",
"sumec velký",
2],

[3,7,
"Je možné na mimopstruhovém revíru použít pstruha obecného jako nástražní rybičku",
"ano",
"pokud má lovnou míru",
"ne",
3],

[3,8,
"Které nástrahy můžeš použít 30. 9. na pstruhové vodě",
"mrtvou vláčenou rybku",
"rousnici",
"umělou mušku",
3],

[3,9,
"Mohu si ponechat pstruha obecného, jenž byl chycen na pstruhové vodě 16. 9.",
"ne",
"ano",
"pokud má lovnou míru",
1],

[3,10,
"Mohu si ponechat pstruha duhového, kterého jsem ulovil 1. 11. na mimopstruhovém revíru",
"ano, pokud má lovnou míru",
"ne",
"mlíčáka",
1],

[3,11,
"Kolik kusů karase stříbřitého si mohu ponechat v jednom dni na mimopstruhovém revíru 30. 9.",
"2",
"4",
"neomezeně",
3],

[3,12,
"V měsíci dubnu můžeme chytat na mimopstruhových revírech",
"5:00 – 22:00 hodin",
"4:00 – 24:00 hodin",
"6:00 – 20:00 hodin",
1],

[3,13,
"Mohu si ponechat lipana podhorního, chyceného na mimopstruhovém revíru 15. 6.",
"ano, pokud má lovnou míru",
"ne",
"ano",
2],

[3,14,
"Mohu si ponechat 2 kusy sumce velkého (8 kg a 16,5 kg), ulovené v jednom dni na mimopstruhovém revíru",
"ne",
"ano",
"ano, byl-li lehčí kus chycen jako první",
1],

[3,15,
"Mohu chytat nástražní rybičky do čeřenu na pstruhovém revíru před 15. dubnem",
"ano",
"jen do hmotnosti 7 kg",
"ne",
3],

[3,16,
"Jako nástražní rybky nemohou být použity",
"ryby, které dosahují své lovné míry a větší",
"ryby lososovité a lipan podhorní, druhy chráněné a nedosahující nejmenší lovnou míru",
"mohou být použity všechny druhy ryb",
2],

[3,17,
"Ve kterém měsíci je na mimopstruhových revírech nejdelší doba lovu",
"v říjnu",
"v lednu",
"v květnu",
3],

[3,18,
"Ve kterém měsíci je na mimopstruhových revírech nejkratší doba lovu",
"v lednu",
"v dubnu",
"v květnu",
1],

[3,19,
"Jakou lovnou míru má štika obecná na pstruhových revírech",
"50 cm",
"40 cm",
"nemá míru",
3],

[3,20,
"Ulovené ryby, které si můžeme ponechat, uchováváme",
"živé ve vezírcích",
"uvázané za skřele provazem",
"zabité a naporcované",
1],

[3,21,
"Při lovu udicí na položenou musí být lovící u prutů přítomen tak, aby",
"je měl v dohledu",
"jimi mohl manipulovat",
"je měl minimálně 2 metry od rukou",
2],

[3,22,
"Lov ryb z loďky je dovolen",
"pouze na údolních nádržích",
"tam, kde to určí uživatel revíru",
"pouze některým členům MO ČRS",
2],

[3,23,
"Lov ryb v blízkosti přehradních hrází je povolen ve vzdálenosti",
"10 metrů od hrázového tělesa",
"50 metrů od hrázového tělesa",
"100 metrů od hrázového tělesa",
3],

[3,24,
"Rybář nesmí lovit ryby v místě",
"kde došlo k nahromadění ryb z důvodu velmi nízkého stavu vody",
"kde vede v blízkosti řeky železniční trať",
"kde ústí do toku městská kanalizace",
1],

[3,25,
"Povinností rybáře, který zjistí hromadné hynutí ryb, je",
"ihned přerušit lov a odejít od vody",
"pokračovat v lovu a hynutí hlásit po skončení lovu MO ČRS",
"ihned přerušit lov a hynutí hlásit Policii ČR a uživateli revíru",
3],

[3,26,
"Jak se měří délka ryb",
"od hlavy k vykrojení ocasní ploutve",
"od vrcholu rypce po konec nejdelších paprsků ocasní ploutve",
"od žaberního oblouku k nejzazšímu konci ocasní ploutve",
2],

[3,27,
"Co uděláte s ulovenou rybou, která je v hájení nebo nedosahuje nejmenší lovné míry",
"uložím ji do vezírku",
"opatrně jí vyndám háček a šetrně pustím zpět do vody v rybářském revíru, v němž byla ulovena",
"ponechám si ji, protože by stejně uhynula",
2],

[3,28,
"Který z rybářů lovil nepovoleným způsobem lovu",
"při lovu měl jeden prut nastražen na položenou, druhý na plavanou",
"dva pruty měl nastraženy na položenou, na každém měl dva návazce s jednoháčkem",
"jeden prut měl nastražen na položenou, druhým lovil přívlačí",
3],

[3,29,
"V sobotu 16. 4. jsem v 15:20 hodin chytil na pstruhovém revíru štiku obecnou 43 cm",
"musím ji vrátit zpět",
"nesmím ji vrátit zpět do pstruhového revíru",
"nesmím si ji ponechat",
2],

[3,30,
"Kolik kusů candáta obecného si mohu ponechat 14. 6. na pstruhovém revíru",
"žádného",
"pouze dva",
"neomezeně",
3],

[3,31,
"Na revíru pstruhovém mohu lovit na umělou mušku",
"jen ty dny, kdy lovím ryby lososovité",
"tři dny v týdnu",
"celý týden",
3],

[3,32,
"Kterou z těchto ryb při rybolovu na revírech pstruhových nesmíme vrátit zpět do vody",
"síh severní maréna",
"okoun říční",
"lipan podhorní",
2],

[3,33,
"Kolik kusů kapra obecného, štiky obecné, candáta obecného, bolena dravého, sumce velkého, amura bílého nebo jejich kombinace, typických pro mimopstruhové revíry, si může rybář ponechat v jednom dni na revírech mimopstruhových",
"3 ks",
"max. 2 kusy kapra obecného, štiky obecné, candáta obecného, bolena dravého, sumce velkého, amura bílého nebo jejich kombinace, pokud při ulovení prvního kusu nebyla již překročena hmotnost 7 kg",
"neomezeně",
2],

[3,34,
"Kolik lososovitých ryb si rybář může ponechat v jednom dni na revírech mimopstruhových",
"2 ks",
"4 ks",
"3 ks",
3],

[3,35,
"Musí mít rybář při lovu u sebe vyprošťovač háčků",
"ne",
"pouze na údolních nádržích",
"ano",
3],

[3,36,
"Kolik kusů cejna velkého si mohu ponechat na mimopstruhovém revíru",
"žádný",
"3 kusy",
"libovolně do 7 kg celkového úlovku",
3],

[3,37,
"Loví rybář nepovoleným způsobem lovu, jestliže chytá na dva pruty, jedním na položenou, druhým zároveň muškaří",
"ne - na revíru mimopstruhovém i na revíru pstruhovém",
"ne - jen na revíru mimopstruhovém",
"ano - na revíru mimopstruhovém i pstruhovém",
3],

[3,38,
"Která z těchto ryb se nesmí vrátit zpět do pstruhového revíru",
"plotice obecná",
"bolen dravý",
"ouklejka pruhovaná",
2],

[3,39,
"Mohu si ponechat 3 kusy candáta obecného, chycené v jednom dni na revíru mimopstruhovém",
"ano",
"ano - ale jen do hmotnosti 7 kg",
"ne",
3],

[3,40,
"Kolik kusů perlína ostrobřichého si smíš ponechat v jednom dni na revíru mimopstruhovém",
"3 ks",
"4 ks",
"libovolně do 7 kg celkového úlovku",
3],

[3,41,
"Můžeš si ponechat kapra obecného uloveného do čeřínku na mimopstruhovém revíru",
"ne",
"pokud má lovnou míru - ano",
"ano",
1],

[3,42,
"Co učiníte s jelcem tlouštěm, který byl uloven na revíru pstruhovém a má háček zaseknutý hluboko v jícnu",
"ustřihneme vlasec a vrátíme ho zpět do vody",
"ponecháme si ho, pokud má lovnou míru",
"nesmíme ho vrátit zpět do pstruhového revíru",
3],

[3,43,
"Dopoledne jsem ulovil a odnesl si 7 kg řádně zapsaných ryb. Mohu jít odpoledne opět na ryby (chytám pouze na revíru mimopstruhovém)",
"ano",
"ano, budu-li chytat jen nástražní ryby",
"ne",
3],

[3,44,
"V jaké vzdálenosti od sebe musí být rybáři při lovu na položenou",
"alespoň 3 m, pokud se nedohodnou jinak",
"alespoň 5 m, pokud se nedohodnou jinak",
"8 m",
1],

[3,45,
"V jaké vzdálenosti od sebe musí být rybáři při lovu přívlačí či lovu na umělou mušku",
"alespoň 20 m, pokud se nedohodnou jinak",
"alespoň 25 m, pokud se nedohodnou jinak",
"30 m",
1],

[3,46,
"Kolik jednoduchých háčků může mít rybář na jedné udici při lovu ryb na položenou na těsto",
"1",
"2",
"neomezeně",
2],

[3,47,
"Musí mít rybář při lovu ryb zapsané datum a číslo revíru, na kterém loví, v povolence k lovu",
"ne",
"jen když chytá velké ryby",
"ano",
3],

[3,48,
"Můžeme chytat na revíru pstruhovém nástražní rybičky do čeřínku",
"ano",
"ne",
"jen na zvláštní povolení",
2],

[3,49,
"Kolikrát týdně můžeme lovit čeřínkem nástražní rybičky na mimopstruhovém revíru",
"3x",
"4x",
"neomezeně",
3],

[3,50,
"Jak maximálně velký může být čeřínek",
"neomezeně velký",
"150 × 100 cm",
"100 × 100 cm",
3],

[3,51,
"Povolenku k lovu je nutno odevzdat organizaci, která povolenku vydala",
"do 15 dnů od skončení platnosti povolenky",
"do 31. 12.",
"do 15. 1. příštího roku",
1],
  /* ========================================
   4. STANOVY ČRS
======================================== */

[4,1,
"Poslání ČRS je zejména",
"těžba ryb za účelem dalšího prodeje koncovým spotřebitelům",
"správa vodních nádrží a toků",
"výkon rybářství, ochrana přírody, výchova dětí a mládeže v oboru rybářství",
3],

[4,2,
"Dokladem členství je",
"přihláška za člena a splněné povinnosti",
"platný členský průkaz",
"přihláška za člena, zaplacení zápisného",
2],

[4,3,
"Jaká je struktura ČRS",
"místní organizace, územní svaz, Republiková rada",
"místní organizace, územní rada, Republikový sněm",
"místní skupiny, místní organizace, vyšší svazové orgány",
1],

[4,4,
"Orgány místní organizace jsou",
"výroční konference, předsednictvo výboru, kontrolní komise",
"členská schůze, výbor, dozorčí komise",
"konference místní organizace, konference územního svazu, Republikový sněm",
2],

[4,5,
"Nejvyšším orgánem místní organizace je",
"předsednictvo výboru",
"výbor místní organizace",
"členská schůze místní organizace",
3],

[4,6,
"Dozorčí komise je",
"poradním orgánem místní organizace či územního svazu",
"kontrolním orgánem místní organizace, územního svazu",
"nejvyšším orgánem místní organizace či územního svazu",
2],

[4,7,
"Územní svazy",
"sdružují výbory místních skupin a organizací",
"sdružují kluby a ostatní rybáře",
"sdružují místní organizace v rozsahu územní působnosti",
3],

[4,8,
"Rybářský svaz zastupují (statutárními orgány jsou)",
"tajemník a hospodář",
"předseda a hospodář",
"předseda a jednatel",
3],

[4,9,
"Do kdy se po podání přihlášky platí členský příspěvek ČRS",
"nejpozději do 1 měsíce po přijetí",
"do tří měsíců po přijetí",
"ihned po přijetí",
1],

[4,10,
"Pro přijetí dítěte za člena ČRS je rozhodující věková hranice",
"od 6 let",
"od počátku školní docházky",
"od 10 let",
2],

[4,11,
"Řádní členové jsou členy",
"jedné místní organizace",
"více místních organizací",
"jedné místní organizace ve více územních svazech",
1],

[4,12,
"Jaká práva vyplývající ze Stanov ČRS nemají děti a mládež",
"žádná",
"jako ostatní členové",
"hlasovat na členské schůzi a být voleni do všech orgánů svazu",
3],

[4,13,
"Věkové kategorie dětí a mládeže se člení",
"děti od 8 let a od 16 let",
"děti do 15 let a mládež do 18 let",
"nedělí se - nečlení se",
2],

[4,14,
"Výbor místní organizace je volen",
"předsednictvem místní organizace",
"členskou schůzí místní organizace",
"místními skupinami",
2],

[4,15,
"Kdo rozhoduje o vyloučení člena",
"po projednání ve výboru MO členská schůze",
"na 1. stupni dozorčí komise a jako odvolací orgán výbor MO",
"výbory místních skupin",
1],

[4,16,
"Podílí se děti a mládež osobní pracovní účastí na činnosti místní organizace",
"ano, od 10 let, podle svých schopností",
"ano, od 16 let do 18 let se úměrně podílí",
"nepodílí se",
3],

[4,17,
"Lze uložit dětem a mládeži kárné opatření (např. odebrání povolenky k rybolovu)",
"nelze",
"ano – za neodpracování brigády",
"ano - za porušení pravidel lovu",
3],
  /* ========================================
   5. ZNALOSTI Z RYBOLOVNÉ TECHNIKY
======================================== */

[5,1,
"U disciplíny č. 1 muška terče musí mít šňůra minimální délku",
"15 m",
"13,5 m",
"12 m",
1],

[5,2,
"V jakých barvách dodává pořadatel závodu závodní mušky",
"v libovolných",
"pouze v bílé",
"bílé, žluté, červené",
3],

[5,3,
"Jaký je průměr terčů pro disciplínu muška terče",
"60 cm",
"70 cm",
"75 cm",
1],

[5,4,
"Jaké je pořadí suchých hodů u disciplíny muška terče",
"2x 1 - 2 - 3 - 4 - 5",
"2x 1 - 5 - 2 - 4 - 3",
"2x 3 - 1 - 4 - 2 - 5",
1],

[5,5,
"Mezi každým suchým hodem",
"musí být nejméně jeden mezihod",
"nemusí být mezihod",
"musí být alespoň 2 mezihody",
1],

[5,6,
"Podium pro mušku terče stojí",
"před 1. terčem",
"před 3. terčem",
"před 5. terčem",
2],

[5,7,
"Rozměry podia pro disciplíny č. 1 a 2 jsou",
"150 cm dlouhé, 100 cm široké a 40 cm vysoké",
"150 cm dlouhé, 120 cm široké a 50 cm vysoké",
"150 cm dlouhé, 150 cm široké a 50 cm vysoké",
3],

[5,8,
"Disciplínu muška terče musí závodník absolvovat za",
"3,50 minut",
"4,50 minut",
"5,30 minut",
3],

[5,9,
"Při disciplíně muška terče se zásah hodnotí",
"4 body",
"5 body",
"6 body",
2],

[5,10,
"Mokré hody absolvuje závodník v pořadí",
"2x 1 - 2 - 3 - 4 - 5",
"2x 3 - 4 - 5 - 1 - 2",
"2x 5 - 4 - 3 - 2 - 1",
1],

[5,11,
"Mezi prvním a druhým sledem mokrých hodů",
"je povolen mezihod",
"není povolen mezihod",
"je povinná minutová přestávka",
2],

[5,12,
"U disciplín muška terče a muška dálka je povolen prut do délky",
"3 m",
"3,5 m",
"2,5 m",
1],

[5,13,
"Jak dlouhý musí být návazec na muškové disciplíny",
"min. 150 cm",
"min. 180 cm",
"min. 200 cm",
2],

[5,14,
"Šňůra při mokrých hodech",
"musí být zkracována během házení za pohybu prutu",
"může být zkracována pomocníkem",
"může být zkracována jen ležící na zemi",
1],

[5,15,
"Čas na mušku dálku jednoruč je",
"10 minut",
"8 minut",
"5 minut",
3],

[5,16,
"Kolik smí použít závodník mušek během disciplíny",
"neomezený počet",
"2 mušky",
"3 mušky",
3],

[5,17,
"Nejnižší počet průběžných oček u prutů zátěžových disciplin",
"3",
"4",
"5",
1],

[5,18,
"Jaké jsou průměry oček u prutů pro zátěžové disciplíny",
"průběžně max. 50 mm, koncové max. 20 mm",
"průběžně max. 50 mm, koncové max. 10 mm",
"průběžné max. 40 mm, koncové max. 5 mm",
1],

[5,19,
"Hmotnost zátěže pro disciplíny č. 3, 4 a 5 je",
"6,5 gramů",
"7 gramů",
"7,5 gramů",
3],

[5,20,
"Při disciplíně Arenberg je nejmenší a největší vzdálenost od středu terče",
"12 a 16 m",
"10 a 18 m",
"10 a 20 m",
2],

[5,21,
"Bodování disciplíny Arenberg je",
"10 - 8 - 6 - 4 - 2",
"po 5 bodech",
"6 - 4 - 2 - 1",
1],

[5,22,
"Čas pro disciplínu Arenberg je",
"10 minut",
"8 minut",
"5 minut",
3],

[5,23,
"Disciplína č. 4 - zátěž terče má háziště",
"5 terčů o průměru 0,76 m",
"3 terče o průměru 0,76 m",
"5 terčů o průměru 0,70 m",
1],

[5,24,
"Čas na disciplínu zátěž terče je",
"10 minut",
"8 minut",
"5 minut",
3],

[5,25,
"Zásah terče při disciplíně zátěž terče se hodnotí",
"2 body",
"5 body",
"10 body",
2],

[5,26,
"Při disciplíně č. 5 - zátěž dálka jednoruč má každý závodník",
"1 hod",
"2 hody",
"3 hody",
3],

[5,27,
"Síla vlasce při disciplíně zátěž dálka jednoruč je",
"min. 0,15 mm",
"min. 0,18 mm",
"není omezena",
2],

[5,28,
"Při disciplíně zátěž dálka jednoruč se počítá",
"první hod",
"všechny tři hody",
"jen nejdelší hod",
3],

[5,29,
"Při disciplíně zátěž dálka jednoruč se boduje",
"1 m = 2 body",
"1 m = 1,5 bodu",
"1 m = 1 bod",
2],

[5,30,
"Délka prutu pro zátěžové disciplíny je",
"min. 137 cm, max. 250 cm",
"min. 150 cm, max. 250 cm",
"min. 155 cm, max. 280 cm",
1],

[5,31,
"Při disciplíně č. 4 zátěž terče se hází",
"3x na jeden terč, ve dvou sledech",
"2x na jeden terč, ve dvou sledech",
"1x na jeden terč, ve dvou sledech",
2],
  /* ========================================
   6. ZÁVODNÍ LOV RYB UDICÍ NA PLAVANOU
      ZLATÁ UDICE
======================================== */

[6,1,
"Na jakých vodách se zpravidla pořádají soutěže v plavané",
"na potocích, řekách, kanálech nebo na vhodných stojatých vodách, kde lze chytat po celé délce úseku vhodného pro sportovní rybolov",
"na vodách s hloubkou větší než 2 m",
"na jakýchkoliv tekoucích vodách",
1],

[6,2,
"Úsek pro závodníka v plavané musí být dlouhý nejméně",
"15 m",
"10 m",
"5 m",
2],

[6,3,
"Jeden závod v plavané při NK ZU trvá (není-li zkrácen pro nepřízeň počasí)",
"2 hodiny",
"1 hodinu",
"3 hodiny",
1],

[6,4,
"V případě, že závod bude zkrácen, musí trvat minimálně",
"30 minut",
"1 hodinu",
"2 hodiny",
2],

[6,5,
"Při závodech ZU LRU plavaná smí do sektoru závodníka vstoupit",
"vedoucí (trenér), který je viditelně označen",
"závodník ze stejného družstva",
"každý divák",
1],

[6,6,
"Příprava na stanovišti, které si závodník vylosoval, je",
"2 × 120 minut",
"2 × 90 minut",
"2 × 60 minut",
3],

[6,7,
"V přípravné době závodník",
"zkouší ulovit ryby, aby zjistil druhovou skladbu",
"vnadí",
"připravuje si nářadí, měří hloubku",
3],

[6,8,
"Kdy může závodník začít vnadit",
"na třetí signál 10 minut před zahájením závodu",
"kdykoliv v přípravné době",
"až při zahájení lovu",
1],

[6,9,
"Při závodním lovu ryb udicí na plavanou je povoleno lovit",
"se dvěma návazci a dvěma jednoduchými háčky",
"s jedním háčkem",
"s libovolným počtem háčků",
2],

[6,10,
"Co nesmí být použito jako nástraha při závodech LRU plavaná",
"muší larvy",
"kroupy",
"rybičky",
3],

[6,11,
"Zakázáno je, aby zátěž byla",
"dělená (více zátěží na udici)",
"průběžná (s možným pohybem po vlasci)",
"větší než je nosnost splávku",
3],

[6,12,
"Při závodech ZU v LRU plavaná se může lovit na",
"jeden prut",
"na dva pruty",
"na libovolný počet prutů",
1],

[6,13,
"Závodník může mít připraveny k lovu",
"jeden náhradní prut",
"dva náhradní pruty",
"libovolné množství prutů",
3],

[6,14,
"Závodník během lovu na plavanou nesmí",
"nechat si podebrat rybu jinou osobou",
"vnadit",
"poslouchat rady trenéra",
1],

[6,15,
"Po skončení závodu se hodnotí všechny ulovené ryby",
"1 gram = 1 bod",
"1 gram = 1 bod a 1 ryba = 1 bod",
"1 gram = 1,5 bodu",
1],

[6,16,
"Při závodech ZU v LRU plavané musí závodník ulovené ryby uchovávat",
"ve vezírku",
"usmrcené na břehu",
"ve vezírku s vnitřním zatížením",
1],

[6,17,
"Při kterém signálu, při závodech ZU LRU plavaná, může závodník začít vnadit",
"při druhém",
"při třetím",
"ihned po vstoupení do závodního sektoru",
2],

[6,18,
"Co značí pátý signál, při závodech ZU LRU plavaná",
"5 minut do konce závodu",
"konec závodu",
"nástup závodníků k vážení",
2],

[6,19,
"Před vstupem do sektoru nesmí mít závodník krmivo",
"v suchém stavu",
"ve vlhkém stavu",
"zpracováno do koulí",
3],

[6,20,
"Při závodech ZU LRU - plavaná nesmí být používány",
"patentky",
"bílí červi",
"kroupy",
1]

];
/* ========================================
   VYTVOŘENÍ FINÁLNÍ DATABÁZE OTÁZEK
======================================== */

const questions = questionsRaw.map(function(item) {

  const section = item[0];
  const number = item[1];
  const questionText = item[2];

  const answer1 = item[3];
  const answer2 = item[4];
  const answer3 = item[5];

  const correctAnswer = item[6];

  const paddedNumber =
    String(number).padStart(3, "0");


  return {

    section: section,

    sectionName:
      questionSections[section],

    number: number,

    id:
      section + "-" + paddedNumber,

    question:
      questionText,

    questionAudio:
      "otazky/otazka-" +
      section +
      "-" +
      paddedNumber +
      ".mp3",


    answers: [

      {
        text: answer1,

        audio:
          "otazky/odpoved-" +
          section +
          "-" +
          paddedNumber +
          "-1.mp3",

        correct:
          correctAnswer === 1
      },

      {
        text: answer2,

        audio:
          "otazky/odpoved-" +
          section +
          "-" +
          paddedNumber +
          "-2.mp3",

        correct:
          correctAnswer === 2
      },

      {
        text: answer3,

        audio:
          "otazky/odpoved-" +
          section +
          "-" +
          paddedNumber +
          "-3.mp3",

        correct:
          correctAnswer === 3
      }

    ]

  };

});


/* ========================================
   KONTROLA DATABÁZE
======================================== */

console.log(
  "Načteno otázek:",
  questions.length
);


/*
  Správný výsledek:

  Načteno otázek: 264
*/
