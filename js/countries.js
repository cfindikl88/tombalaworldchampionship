// 128 Countries Data for Tournament Mode
// Each country has: id, name, flag emoji, and color palette

export const COUNTRIES = [
    // Americas (20)
    { id: "USA", continent: "Americas", name: "Amerika Birleşik Devletleri", flag: "🇺🇸", colors: { primary: "#B22234", secondary: "#3C3B6E", accent: "#FFFFFF" }, facts: ["Özgürlük Heykeli, Fransa'nın hediyesidir.", "Dünyanın en büyük ekonomisine sahiptir.", "50 eyaletten oluşur."] },
    { id: "CAN", continent: "Americas", name: "Kanada", flag: "🇨🇦", colors: { primary: "#FF0000", secondary: "#FFFFFF", accent: "#000000" }, facts: ["Dünyanın en uzun kıyı şeridine sahiptir.", "Göller ülkesidir, dünya göllerinin %60'ı buradadır.", "Akçaağaç yaprağı ulusal semboldür."] },
    { id: "BRA", continent: "Americas", name: "Brezilya", flag: "🇧🇷", colors: { primary: "#009739", secondary: "#FEDD00", accent: "#002776" }, facts: ["Dünyanın en büyük kahve üreticisidir.", "Amazon Yağmur Ormanlarının büyük kısmı buradadır.", "Futbol en popüler spordur."] },
    { id: "ARG", continent: "Americas", name: "Arjantin", flag: "🇦🇷", colors: { primary: "#74ACDF", secondary: "#FFFFFF", accent: "#F6B40E" }, facts: ["Tango dansının doğduğu yerdir.", "Dünyanın en geniş caddesi 9 de Julio buradadır.", "Futbol efsaneleri Maradona ve Messi'nin ülkesidir."] },
    { id: "MEX", continent: "Americas", name: "Meksika", flag: "🇲🇽", colors: { primary: "#006847", secondary: "#FFFFFF", accent: "#CE1126" }, facts: ["Aztek ve Maya medeniyetlerine ev sahipliği yapmıştır.", "Çikolatanın anavatanıdır.", "Dünyanın en çok İspanyolca konuşulan ülkesidir."] },
    { id: "CHI", continent: "Americas", name: "Şili", flag: "🇨🇱", colors: { primary: "#0039A6", secondary: "#FFFFFF", accent: "#D52B1E" }, facts: ["Dünyanın en uzun ve dar ülkesidir.", "Bakır üretiminde dünya lideridir.", "Atacama Çölü, dünyanın en kurak yeridir."] },
    { id: "COL", continent: "Americas", name: "Kolombiya", flag: "🇨🇴", colors: { primary: "#FCD116", secondary: "#003893", accent: "#CE1126" }, facts: ["Zümrüt üretiminde dünya lideridir.", "Kahvesi dünyaca ünlüdür.", "İki okyanusa kıyısı olan tek Güney Amerika ülkesidir."] },
    { id: "PER", continent: "Americas", name: "Peru", flag: "🇵🇪", colors: { primary: "#D91023", secondary: "#FFFFFF", accent: "#D91023" }, facts: ["Machu Picchu antik kenti buradadır.", "Patatesin anavatanıdır.", "Amazon nehrinin kaynağı buradadır."] },
    { id: "URU", continent: "Americas", name: "Uruguay", flag: "🇺🇾", colors: { primary: "#0038A8", secondary: "#FFFFFF", accent: "#FCD116" }, facts: ["İlk FIFA Dünya Kupası'nı kazanan ülkedir.", "Güney Amerika'nın en küçük ikinci ülkesidir.", "Kişi başına düşen sığır sayısı çok yüksektir."] },
    { id: "VEN", continent: "Americas", name: "Venezuela", flag: "🇻🇪", colors: { primary: "#FFCC00", secondary: "#00247D", accent: "#CF142B" }, facts: ["Dünyanın en yüksek şelalesi Angel Şelalesi buradadır.", "Petrol rezervleri çok zengindir.", "İsmi 'Küçük Venedik' anlamına gelir."] },
    { id: "ECU", continent: "Americas", name: "Ekvador", flag: "🇪🇨", colors: { primary: "#FFD100", secondary: "#0072CE", accent: "#EF3340" }, facts: ["Ülkenin adı Ekvator çizgisinden gelir.", "Galapagos Adaları bu ülkeye aittir.", "Dünyanın en yüksek aktif yanardağına sahiptir."] },
    { id: "BOL", continent: "Americas", name: "Bolivya", flag: "🇧🇴", colors: { primary: "#D52B1E", secondary: "#F9E300", accent: "#007934" }, facts: ["Dünyanın en yüksek başkenti La Paz'a sahiptir.", "Salar de Uyuni tuz gölü buradadır.", "Denize kıyısı olmayan iki Güney Amerika ülkesinden biridir."] },
    { id: "PAR", continent: "Americas", name: "Paraguay", flag: "🇵🇾", colors: { primary: "#D52B1E", secondary: "#FFFFFF", accent: "#0038A8" }, facts: ["Bayrağının ön ve arka yüzü farklıdır.", "Guarani dili İspanyolca ile birlikte resmi dildir.", "Dünyanın en büyük hidroelektrik santrallerinden birine sahiptir."] },
    { id: "CRC", continent: "Americas", name: "Kosta Rika", flag: "🇨🇷", colors: { primary: "#002B7F", secondary: "#FFFFFF", accent: "#CE1126" }, facts: ["Ordusu olmayan nadir ülkelerden biridir.", "Biyoçeşitliliği ile ünlüdür.", "Pura Vida (Saf Hayat) yaşam felsefesidir."] },
    { id: "PAN", continent: "Americas", name: "Panama", flag: "🇵🇦", colors: { primary: "#005293", secondary: "#FFFFFF", accent: "#D21034" }, facts: ["Panama Kanalı ile ünlüdür.", "Güneşin doğuşunu ve batışını okyanustan izleyebilirsiniz.", "Orta Amerika'nın en güney ülkesidir."] },
    { id: "JAM", continent: "Americas", name: "Jamaika", flag: "🇯🇲", colors: { primary: "#009B3A", secondary: "#FED100", accent: "#000000" }, facts: ["Reggae müziğinin ve Bob Marley'in vatanıdır.", "Bayrağında kırmızı, beyaz veya mavi olmayan tek ülkedir.", "Hızlı koşucularıyla ünlüdür."] },
    { id: "CUB", continent: "Americas", name: "Küba", flag: "🇨🇺", colors: { primary: "#002A8F", secondary: "#FFFFFF", accent: "#CF142B" }, facts: ["Purosu ve klasik arabaları ile meşhurdur.", "Karayipler'in en büyük adasıdır.", "Salsa dansının merkezlerinden biridir."] },
    { id: "DOM", continent: "Americas", name: "Dominik Cumhuriyeti", flag: "🇩🇴", colors: { primary: "#002D62", secondary: "#CE1126", accent: "#FFFFFF" }, facts: ["Kristof Kolomb'un Amerika'daki ilk durağıdır.", "Merengue müziğinin anavatanıdır.", "Güzel plajlarıyla turizm cennetidir."] },
    { id: "GTM", continent: "Americas", name: "Guatemala", flag: "🇬🇹", colors: { primary: "#4997D0", secondary: "#FFFFFF", accent: "#4997D0" }, facts: ["Maya medeniyetinin kalbidir.", "20'den fazla farklı Maya dili konuşulur.", "Çikolata ilk kez burada tüketilmiştir."] },
    { id: "HON", continent: "Americas", name: "Honduras", flag: "🇭🇳", colors: { primary: "#0073CF", secondary: "#FFFFFF", accent: "#0073CF" }, facts: ["Muz Cumhuriyeti terimi ilk kez burası için kullanılmıştır.", "Copan Maya harabeleri buradadır.", "Büyük Bariyer Resifi'nden sonraki en büyük mercan resifi buradadır."] },

    // Europe (30)
    { id: "GER", continent: "Europe", name: "Almanya", flag: "🇩🇪", colors: { primary: "#000000", secondary: "#DD0000", accent: "#FFCE00" }, facts: ["Avrupa'nın en büyük ekonomisidir.", "Oktoberfest festivali ünlüdür.", "Otobanlarında hız sınırı yoktur."] },
    { id: "FRA", continent: "Europe", name: "Fransa", flag: "🇫🇷", colors: { primary: "#0055A4", secondary: "#FFFFFF", accent: "#EF4135" }, facts: ["Eyfel Kulesi Paris'tedir.", "Dünyanın en çok turist çeken ülkesidir.", "300'den fazla peynir çeşidi vardır."] },
    { id: "GBR", continent: "Europe", name: "Birleşik Krallık", flag: "🇬🇧", colors: { primary: "#012169", secondary: "#FFFFFF", accent: "#C8102E" }, facts: ["Futbolun doğduğu yerdir.", "Kraliçe ile ünlüdür.", "Londra Metrosu dünyanın en eskisidir."] },
    { id: "ITA", continent: "Europe", name: "İtalya", flag: "🇮🇹", colors: { primary: "#009246", secondary: "#FFFFFF", accent: "#CE2B37" }, facts: ["Pizza ve makaranın anavatanıdır.", "Roma İmparatorluğu'nun merkezidir.", "En çok UNESCO mirasına sahip ülkelerdendir."] },
    { id: "ESP", continent: "Europe", name: "İspanya", flag: "🇪🇸", colors: { primary: "#AA151B", secondary: "#F1BF00", accent: "#AA151B" }, facts: ["Boğa güreşleri ile bilinir.", "Zeytinyağı üretiminde dünya lideridir.", "Flamenko dansı ünlüdür."] },
    { id: "NED", continent: "Europe", name: "Hollanda", flag: "🇳🇱", colors: { primary: "#21468B", secondary: "#FFFFFF", accent: "#AE1C28" }, facts: ["Laleleri ve yel değirmenleri ile meşhurdur.", "Bisiklet kullanımı çok yaygındır.", "Ülkenin büyük kısmı deniz seviyesinin altındadır."] },
    { id: "TUR", continent: "Europe", name: "Türkiye", flag: "🇹🇷", colors: { primary: "#E30A17", secondary: "#FFFFFF", accent: "#E30A17" }, facts: ["İki kıtayı birbirine bağlar.", "Çay tüketiminde dünya lideridir.", "İstanbul, dünyanın en tarihi şehirlerinden biridir."] },
    { id: "POL", continent: "Europe", name: "Polonya", flag: "🇵🇱", colors: { primary: "#DC143C", secondary: "#FFFFFF", accent: "#DC143C" }, facts: ["Avrupa'nın kalbinde yer alır.", "Marie Curie Polonyalıdır.", "Zengin bir tarihe sahiptir."] },
    { id: "POR", continent: "Europe", name: "Portekiz", flag: "🇵🇹", colors: { primary: "#006600", secondary: "#FF0000", accent: "#FFD700" }, facts: ["Mantar üretiminde dünya lideridir.", "Avrupa'nın en batı ucundadır.", "Coğrafi keşiflerin öncüsüdür."] },
    { id: "BEL", continent: "Europe", name: "Belçika", flag: "🇧🇪", colors: { primary: "#000000", secondary: "#FDDA24", accent: "#EF3340" }, facts: ["Çikolataları dünyaca ünlüdür.", "AB'nin merkezi Brüksel'dedir.", "Çizgi roman kültürü gelişmiştir."] },
    { id: "SWE", continent: "Europe", name: "İsveç", flag: "🇸🇪", colors: { primary: "#006AA7", secondary: "#FECC00", accent: "#006AA7" }, facts: ["IKEA ve Spotify'ın doğduğu yerdir.", "Nobel ödülleri burada verilir.", "Fika kahve kültürü önemlidir."] },
    { id: "NOR", continent: "Europe", name: "Norveç", flag: "🇳🇴", colors: { primary: "#BA0C2F", secondary: "#00205B", accent: "#FFFFFF" }, facts: ["Fiyortları ile ünlüdür.", "Vikinglerin anavatanıdır.", "Dünyanın en mutlu ülkelerinden biridir."] },
    { id: "DEN", continent: "Europe", name: "Danimarka", flag: "🇩🇰", colors: { primary: "#C8102E", secondary: "#FFFFFF", accent: "#C8102E" }, facts: ["LEGO'nun anavatanıdır.", "Dünyanın en mutlu ülkelerinden biridir.", "Bisiklet kullanımı çok yaygındır."] },
    { id: "FIN", continent: "Europe", name: "Finlandiya", flag: "🇫🇮", colors: { primary: "#003580", secondary: "#FFFFFF", accent: "#003580" }, facts: ["Bin göller ülkesidir.", "Sauna kültürü çok güçlüdür.", "Noel Baba'nın evi Rovaniemi'dedir."] },
    { id: "SUI", continent: "Europe", name: "İsviçre", flag: "🇨🇭", colors: { primary: "#FF0000", secondary: "#FFFFFF", accent: "#FF0000" }, facts: ["Çikolata ve saatleri ile ünlüdür.", "4 resmi dili vardır.", "Tarafsızlığı ile bilinir."] },
    { id: "AUT", continent: "Europe", name: "Avusturya", flag: "🇦🇹", colors: { primary: "#ED2939", secondary: "#FFFFFF", accent: "#ED2939" }, facts: ["Mozart ve Beethoven'ın vatanıdır.", "Alp dağları buradadır.", "Viyana valsi ünlüdür."] },
    { id: "GRE", continent: "Europe", name: "Yunanistan", flag: "🇬🇷", colors: { primary: "#0D5EAF", secondary: "#FFFFFF", accent: "#0D5EAF" }, facts: ["Demokrasinin doğduğu yerdir.", "Antik Yunan medeniyetinin merkezidir.", "6000'den fazla adası vardır."] },
    { id: "CZE", continent: "Europe", name: "Çekya", flag: "🇨🇿", colors: { primary: "#11457E", secondary: "#FFFFFF", accent: "#D7141A" }, facts: ["Bira tüketiminde dünya lideridir.", "Prag Kalesi dünyanın en büyük kapalı kalesıdir.", "Kristal camları meşhurdur."] },
    { id: "HUN", continent: "Europe", name: "Macaristan", flag: "🇭🇺", colors: { primary: "#CD2A3E", secondary: "#FFFFFF", accent: "#436F4D" }, facts: ["Budapeşte'de 1000'den fazla termal kaynak vardır.", "Rubik Küpü bir Macar tarafından icat edilmiştir.", "Paprika en ünlü baharatıdır."] },
    { id: "ROU", continent: "Europe", name: "Romanya", flag: "🇷🇴", colors: { primary: "#002B7F", secondary: "#FCD116", accent: "#CE1126" }, facts: ["Dracula efsanesinin evi Transilvanya buradadır.", "Dünyanın ikinci en büyük binası Parlamento Sarayı buradadır.", "Latin kökenli tek Doğu Avrupa ülkesidir."] },
    { id: "BUL", continent: "Europe", name: "Bulgaristan", flag: "🇧🇬", colors: { primary: "#FFFFFF", secondary: "#00966E", accent: "#D62612" }, facts: ["Dünya gül yağı üretiminin çoğunu karşılar.", "Kiril alfabesinin doğduğu yerdir.", "Yoğurdu ile ünlüdür."] },
    { id: "SRB", continent: "Europe", name: "Sırbistan", flag: "🇷🇸", colors: { primary: "#C6363C", secondary: "#0C4076", accent: "#FFFFFF" }, facts: ["Ahududu üretiminde dünya liderlerindendir.", "Tenis yıldızı Novak Djokovic'in ülkesidir.", "Belgrad en eski Avrupa şehirlerindendir."] },
    { id: "CRO", continent: "Europe", name: "Hırvatistan", flag: "🇭🇷", colors: { primary: "#FF0000", secondary: "#FFFFFF", accent: "#171796" }, facts: ["Kravatın ana vatanıdır.", "Game of Thrones Dubrovnik'te çekilmiştir.", "Dalmaçyalı köpeklerin kökenidir."] },
    { id: "UKR", continent: "Europe", name: "Ukrayna", flag: "🇺🇦", colors: { primary: "#005BBB", secondary: "#FFD500", accent: "#005BBB" }, facts: ["Avrupa'nın en geniş yüzölçümlü ülkesidir.", "Ayçiçek yağı üretiminde liderdir.", "Dünyanın en derin metro istasyonuna sahiptir."] },
    { id: "IRL", continent: "Europe", name: "İrlanda", flag: "🇮🇪", colors: { primary: "#169B62", secondary: "#FFFFFF", accent: "#FF883E" }, facts: ["Cadılar Bayramı'nın kökenidir.", "Ülkede hiç yılan yoktur.", "Eurovision'u en çok kazanan ülkedir."] },
    { id: "ISL", continent: "Europe", name: "İzlanda", flag: "🇮🇸", colors: { primary: "#02529C", secondary: "#DC1E35", accent: "#FFFFFF" }, facts: ["Sivrisinek bulunmayan nadir ülkelerdendir.", "Jeotermal enerji kullanımı çok yaygındır.", "Kişi başına düşen kitap sayısı çok yüksektir."] },
    { id: "SCO", continent: "Europe", name: "İskoçya", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", colors: { primary: "#0065BD", secondary: "#FFFFFF", accent: "#0065BD" }, facts: ["Golf sporunun doğduğu yerdir.", "Ulusal hayvanı Tek Boynuzlu At'tır.", "Erkekler geleneksel kilt eteği giyer."] },
    { id: "WAL", continent: "Europe", name: "Galler", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", colors: { primary: "#00A950", secondary: "#FFFFFF", accent: "#C8102E" }, facts: ["Dünyada kilometrekareye en çok kale düşen ülkedir.", "Bayrağında Kırmızı Ejderha vardır.", "Llanfairpwllgwyngyll... adında çok uzun isimli bir kasabası vardır."] },
    { id: "SVK", continent: "Europe", name: "Slovakya", flag: "🇸🇰", colors: { primary: "#0B4EA2", secondary: "#FFFFFF", accent: "#EE1C25" }, facts: ["6000'den fazla mağarası vardır.", "Dünyanın en yüksek ahşap sunağı buradadır.", "Otomobil üretiminde kişi başına liderdir."] },
    { id: "SVN", continent: "Europe", name: "Slovenya", flag: "🇸🇮", colors: { primary: "#FFFFFF", secondary: "#005DA4", accent: "#ED1C24" }, facts: ["50 bin kişiye bir arıcı düşer.", "Dünyanın en eski şarap asması buradadır.", "Ülke topraklarının %60'ı ormandır."] },

    // Asia (30)
    { id: "CHN", continent: "Asia", name: "Çin", flag: "🇨🇳", colors: { primary: "#DE2910", secondary: "#FFDE00", accent: "#DE2910" }, facts: ["Çin Seddi dünyanın en uzun yapısıdır.", "Çay, kağıt ve pusula burada icat edilmiştir.", "Panda sadece Çin'de doğal ortamda yaşar."] },
    { id: "JPN", continent: "Asia", name: "Japonya", flag: "🇯🇵", colors: { primary: "#BC002D", secondary: "#FFFFFF", accent: "#BC002D" }, facts: ["Dünyanın en eski monarşisine sahiptir.", "Suşi en ünlü yemeğidir.", "Otomat makinesi sayısı çok yüksektir."] },
    { id: "IND", continent: "Asia", name: "Hindistan", flag: "🇮🇳", colors: { primary: "#FF9933", secondary: "#FFFFFF", accent: "#138808" }, facts: ["Satranç oyunu burada icat edilmiştir.", "Baharatın anavatanıdır.", "Yoga'nın doğduğu yerdir."] },
    { id: "KOR", continent: "Asia", name: "Güney Kore", flag: "🇰🇷", colors: { primary: "#003478", secondary: "#CD2E3A", accent: "#FFFFFF" }, facts: ["Kimchi ulusal yemeğidir.", "İnternet hızı dünyada ilk sıralardadır.", "Taekwondo'nun vatanıdır."] },
    { id: "THA", continent: "Asia", name: "Tayland", flag: "🇹🇭", colors: { primary: "#A51931", secondary: "#F4F5F8", accent: "#2D2A4A" }, facts: ["Siyam kedilerinin kökenidir.", "Hiçbir zaman sömürgeleştirilmemiştir.", "Bangkok dünyanın en sıcak şehirlerindendir."] },
    { id: "IDN", continent: "Asia", name: "Endonezya", flag: "🇮🇩", colors: { primary: "#FF0000", secondary: "#FFFFFF", accent: "#FF0000" }, facts: ["17.000'den fazla adaya sahiptir.", "Komodo ejderi burada yaşar.", "Dünyanın en kalabalık Müslüman nüfusuna sahiptir."] },
    { id: "UAE", continent: "Asia", name: "Birleşik Arap Emirlikleri", flag: "🇦🇪", colors: { primary: "#00732F", secondary: "#FFFFFF", accent: "#FF0000" }, facts: ["Dünyanın en yüksek binası Burj Khalifa buradadır.", "Nüfusunun %80'inden fazlası yabancıdır.", "Yapay Palmiye Adası ünlüdür."] },
    { id: "SAU", continent: "Asia", name: "Suudi Arabistan", flag: "🇸🇦", colors: { primary: "#165B33", secondary: "#FFFFFF", accent: "#165B33" }, facts: ["İslam'ın kutsal şehirleri Mekke ve Medine buradadır.", "Nehri olmayan en büyük ülkelerdendir.", "Dünyanın en büyük petrol ihracatçısıdır."] },
    { id: "IRN", continent: "Asia", name: "İran", flag: "🇮🇷", colors: { primary: "#239F40", secondary: "#FFFFFF", accent: "#DA0000" }, facts: ["Pers halıları dünyaca ünlüdür.", "Eski Pers İmparatorluğu'nun merkezidir.", "Hafta sonu tatili Cuma günüdür."] },
    { id: "IRQ", continent: "Asia", name: "Irak", flag: "🇮🇶", colors: { primary: "#CE1126", secondary: "#FFFFFF", accent: "#007A3D" }, facts: ["Medeniyetin beşiği Mezopotamya buradadır.", "Tekerlek burada icat edilmiştir.", "Bağdat tarihi bir ilim merkezidir."] },
    { id: "ISR", continent: "Asia", name: "İsrail", flag: "🇮🇱", colors: { primary: "#0038B8", secondary: "#FFFFFF", accent: "#0038B8" }, facts: ["Lut Gölü (Ölü Deniz) dünyanın en alçak noktasıdır.", "Kudüs üç din için kutsaldır.", "Kiraz domates burada geliştirilmiştir."] },
    { id: "VIE", continent: "Asia", name: "Vietnam", flag: "🇻🇳", colors: { primary: "#DA251D", secondary: "#FFCD00", accent: "#DA251D" }, facts: ["Dünyanın en büyük ikinci kahve ihracatçısıdır.", "Motosiklet kullanımı çok yaygındır.", "Son Doong mağarası dünyanın en büyüğüdür."] },
    { id: "PHI", continent: "Asia", name: "Filipinler", flag: "🇵🇭", colors: { primary: "#0038A8", secondary: "#CE1126", accent: "#FCD116" }, facts: ["7.000'den fazla adadan oluşur.", "Jeepney adlı renkli dolmuşları ünlüdür.", "Hemşire ihracatında dünya lideridir."] },
    { id: "MYS", continent: "Asia", name: "Malezya", flag: "🇲🇾", colors: { primary: "#CC0001", secondary: "#FFFFFF", accent: "#010066" }, facts: ["Petronas İkiz Kuleleri buradadır.", "Dünyanın en büyük çiçeği Raflesya burada açar.", "Asya'nın en güney ucu buradadır."] },
    { id: "SGP", continent: "Asia", name: "Singapur", flag: "🇸🇬", colors: { primary: "#ED2939", secondary: "#FFFFFF", accent: "#ED2939" }, facts: ["Çiğnediğiniz sakızı yere atmak yasaktır.", "Dünyanın tek ada şehir devletidir.", "En yeşil şehirlerden biridir."] },
    { id: "PAK", continent: "Asia", name: "Pakistan", flag: "🇵🇰", colors: { primary: "#01411C", secondary: "#FFFFFF", accent: "#01411C" }, facts: ["K2 dünyanın en yüksek ikinci dağıdır.", "Futbol topu üretiminde dünya lideridir.", "İndus Vadisi medeniyeti buradadır."] },
    { id: "BAN", continent: "Asia", name: "Bangladeş", flag: "🇧🇩", colors: { primary: "#006A4E", secondary: "#F42A41", accent: "#006A4E" }, facts: ["Dünyanın en uzun doğal plajına sahiptir.", "Nehirler ülkesidir, 700'den fazla nehir vardır.", "Kraliyet Bengal Kaplanı ulusal hayvandır."] },
    { id: "KAZ", continent: "Asia", name: "Kazakistan", flag: "🇰🇿", colors: { primary: "#00AFCA", secondary: "#FEC50C", accent: "#00AFCA" }, facts: ["Dünyanın denize kıyısı olmayan en büyük ülkesidir.", "Elmanın ana vatanı olduğu söylenir.", "Baykonur Uzay Üssü buradadır."] },
    { id: "UZB", continent: "Asia", name: "Özbekistan", flag: "🇺🇿", colors: { primary: "#1EB53A", secondary: "#0099B5", accent: "#CE1126" }, facts: ["İpek Yolu'nun kalbidir.", "Semerkant şehri tarihi ile ünlüdür.", "Denize ulaşmak için iki ülke geçmek gereken tek ülkedir (Liechtenstein ile)."] },
    { id: "QAT", continent: "Asia", name: "Katar", flag: "🇶🇦", colors: { primary: "#8A1538", secondary: "#FFFFFF", accent: "#8A1538" }, facts: ["Kişi başına düşen geliri en yüksek ülkelerdendir.", "Ülkede orman yoktur.", "2022 Dünya Kupası'na ev sahipliği yapmıştır."] },
    { id: "KUW", continent: "Asia", name: "Kuveyt", flag: "🇰🇼", colors: { primary: "#007A3D", secondary: "#FFFFFF", accent: "#CE1126" }, facts: ["Dünyanın en değerli para birimine sahiptir.", "Petrol rezervleri çok zengindir.", "Su kuleleri mimarisi ile ünlüdür."] },
    { id: "JOR", continent: "Asia", name: "Ürdün", flag: "🇯🇴", colors: { primary: "#000000", secondary: "#FFFFFF", accent: "#CE1126" }, facts: ["Petra antik kenti buradadır.", "Lut Gölü'nde batmadan yüzebilirsiniz.", "Zeytin ağacı kutsal kabul edilir."] },
    { id: "LEB", continent: "Asia", name: "Lübnan", flag: "🇱🇧", colors: { primary: "#ED1C24", secondary: "#FFFFFF", accent: "#00A651" }, facts: ["Bayrağında Sedir ağacı vardır.", "Fenikelilerin ana vatanıdır.", "Byblos dünyanın en eski şehirlerindendir."] },
    { id: "SYR", continent: "Asia", name: "Suriye", flag: "🇸🇾", colors: { primary: "#CE1126", secondary: "#FFFFFF", accent: "#007A3D" }, facts: ["Şam, sürekli yaşanan en eski başkentlerdendir.", "Şam çeliği kılıçlarıyla ünlüdür.", "Arap alfabesinin ilk formları burada gelişmiştir."] },
    { id: "YEM", continent: "Asia", name: "Yemen", flag: "🇾🇪", colors: { primary: "#CE1126", secondary: "#FFFFFF", accent: "#000000" }, facts: ["Mocha kahvesi ismini buradan alır.", "Dünyanın ilk gökdelen şehri Shibam buradadır.", "Ejderha Kanı Ağacı Sokotra adasındadır."] },
    { id: "OMA", continent: "Asia", name: "Umman", flag: "🇴🇲", colors: { primary: "#FFFFFF", secondary: "#DA000C", accent: "#009A44" }, facts: ["En eski bağımsız Arap devletidir.", "Günlük (Frankincense) tütsüsü meşhurdur.", "Gemi yapım ustalığı ile bilinir."] },
    { id: "AFG", continent: "Asia", name: "Afganistan", flag: "🇦🇫", colors: { primary: "#000000", secondary: "#D32011", accent: "#007A36" }, facts: ["Lapis Lazuli taşının ana kaynağıdır.", "Buzkashi adlı atlı sporu meşhurdur.", "Dünyanın en kaliteli narlarından bazıları burada yetişir."] },
    { id: "NEP", continent: "Asia", name: "Nepal", flag: "🇳🇵", colors: { primary: "#DC143C", secondary: "#003893", accent: "#FFFFFF" }, facts: ["Dünyanın en yüksek dağı Everest buradadır.", "Bayrağı dikdörtgen olmayan tek ülkedir.", "Buda'nın doğum yeridir."] },
    { id: "SRI", continent: "Asia", name: "Sri Lanka", flag: "🇱🇰", colors: { primary: "#8D153A", secondary: "#F7941D", accent: "#00534E" }, facts: ["Seylan çayı dünyaca ünlüdür.", "Tarçının ana vatanıdır.", "Marco Polo tarafından 'en güzel ada' olarak anılmıştır."] },
    { id: "MMR", continent: "Asia", name: "Myanmar", flag: "🇲🇲", colors: { primary: "#FECB00", secondary: "#34B233", accent: "#EA2839" }, facts: ["Binlerce pagoda ve tapınağa sahiptir.", "Yüzlerine Thanaka sürerler.", "Değerli yakut taşlarıyla tanınır."] },

    // Africa (30)
    { id: "ZAF", continent: "Africa", name: "Güney Afrika", flag: "🇿🇦", colors: { primary: "#007A4D", secondary: "#FFB612", accent: "#DE3831" }, facts: ["3 başkenti olan tek ülkedir.", "Masa Dağı dünyanın en eski dağlarından biridir.", "11 resmi dili vardır."] },
    { id: "EGY", continent: "Africa", name: "Mısır", flag: "🇪🇬", colors: { primary: "#CE1126", secondary: "#FFFFFF", accent: "#000000" }, facts: ["Giza Piramitleri antik dünyanın 7 harikasından biridir.", "Dünyanın en uzun nehri Nil buradadır.", "365 gün takvimini ilk kullanan medeniyettir."] },
    { id: "NGA", continent: "Africa", name: "Nijerya", flag: "🇳🇬", colors: { primary: "#008751", secondary: "#FFFFFF", accent: "#008751" }, facts: ["Afrika'nın en kalabalık ülkesidir.", "Nollywood film endüstrisi dünyada 2. sıradadır.", "250'den fazla etnik grup yaşar."] },
    { id: "KEN", continent: "Africa", name: "Kenya", flag: "🇰🇪", colors: { primary: "#000000", secondary: "#BC0000", accent: "#006600" }, facts: ["Safari kelimesi Svahili dilinde 'yolculuk' demektir.", "Dünyanın en iyi maraton koşucularını yetiştirir.", "Büyük Göç'e ev sahipliği yapar."] },
    { id: "MAR", continent: "Africa", name: "Fas", flag: "🇲🇦", colors: { primary: "#C1272D", secondary: "#006233", accent: "#C1272D" }, facts: ["Dünyanın en eski üniversitesi Karaviyyin buradadır.", "Mavi Şehir Şafşavan turistlerin gözdesidir.", "Argan yağı sadece burada üretilir."] },
    { id: "GHA", continent: "Africa", name: "Gana", flag: "🇬🇭", colors: { primary: "#006B3F", secondary: "#FCD116", accent: "#CE1126" }, facts: ["Dünyanın en büyük ikinci kakao üreticisidir.", "Eski adı Altın Sahili'dir.", "Afrika'da bağımsızlığını kazanan ilk ülkedir."] },
    { id: "TUN", continent: "Africa", name: "Tunus", flag: "🇹🇳", colors: { primary: "#E70013", secondary: "#FFFFFF", accent: "#E70013" }, facts: ["Kartaca antik kenti buradadır.", "Yıldız Savaşları'nın Tatooine sahneleri burada çekilmiştir.", "Arap Baharı'nın başladığı yerdir."] },
    { id: "ALG", continent: "Africa", name: "Cezayir", flag: "🇩🇿", colors: { primary: "#006233", secondary: "#FFFFFF", accent: "#D21034" }, facts: ["Afrika'nın yüzölçümü en büyük ülkesidir.", "Sahra Çölü ülkenin %80'ini kaplar.", "Dünyanın en iyi hurmaları burada yetişir."] },
    { id: "SEN", continent: "Africa", name: "Senegal", flag: "🇸🇳", colors: { primary: "#00853F", secondary: "#FDEF42", accent: "#E31B23" }, facts: ["Pembe Göl (Retba Gölü) buradadır.", "Paris-Dakar Rallisi'nin bitiş noktasıydı.", "Afrika'nın en batı ucudur."] },
    { id: "CIV", continent: "Africa", name: "Fildişi Sahili", flag: "🇨🇮", colors: { primary: "#F77F00", secondary: "#FFFFFF", accent: "#009E60" }, facts: ["Dünyanın en büyük kakao üreticisidir.", "Ülke ismi Fransızca 'Fildişi Sahili' demektir.", "Afrika'nın en büyük bazilikası buradadır."] },
    { id: "CMR", continent: "Africa", name: "Kamerun", flag: "🇨🇲", colors: { primary: "#007A5E", secondary: "#CE1126", accent: "#FCD116" }, facts: ["Afrika'nın minyatürü olarak bilinir.", "Hem İngilizce hem Fransızca resmi dildir.", "Milli takımı 'Yenilmez Aslanlar' olarak bilinir."] },
    { id: "ETH", continent: "Africa", name: "Etiyopya", flag: "🇪🇹", colors: { primary: "#078930", secondary: "#FCDD09", accent: "#DA121A" }, facts: ["Kahvenin keşfedildiği yerdir.", "Kendi takvimini ve saat sistemini kullanır.", "Hiç sömürge olmamış tek Afrika ülkesidir."] },
    { id: "UGA", continent: "Africa", name: "Uganda", flag: "🇺🇬", colors: { primary: "#000000", secondary: "#FCDC04", accent: "#D90000" }, facts: ["Afrika'nın İncisi olarak bilinir.", "Viktorya Gölü'nün kaynağı buradadır.", "Dağ gorillerinin yaşam alanıdır."] },
    { id: "TAN", continent: "Africa", name: "Tanzanya", flag: "🇹🇿", colors: { primary: "#1EB53A", secondary: "#FCD116", accent: "#00A3DD" }, facts: ["Afrika'nın en yüksek noktası Kilimanjaro Dağı buradadır.", "Serengeti Milli Parkı buradadır.", "Freddie Mercury Zanzibar'da doğmuştur."] },
    { id: "ZIM", continent: "Africa", name: "Zimbabve", flag: "🇿🇼", colors: { primary: "#319E48", secondary: "#FFD200", accent: "#DA2128" }, facts: ["Victoria Şelalesi buradadır.", "Dünyanın en büyük insan yapımı göllerinden Kariba buradadır.", "Taş evler anlamına gelir."] },
    { id: "ANG", continent: "Africa", name: "Angola", flag: "🇦🇴", colors: { primary: "#CE1126", secondary: "#000000", accent: "#FFCC29" }, facts: ["Kizomba dansının doğduğu yerdir.", "Devasa elmas rezervlerine sahiptir.", "Kalandula Şelalesi Afrika'nın en büyüklerindendir."] },
    { id: "MOZ", continent: "Africa", name: "Mozambik", flag: "🇲🇿", colors: { primary: "#007A33", secondary: "#000000", accent: "#FCE100" }, facts: ["Bayrağında hem kitap hem de silah olan tek ülkedir.", "Mercan resifleri ile ünlüdür.", "Portekizce resmi dildir."] },
    { id: "ZAM", continent: "Africa", name: "Zambiya", flag: "🇿🇲", colors: { primary: "#198A00", secondary: "#EF7D00", accent: "#DE2010" }, facts: ["Yürüyüş safarisinin doğduğu yerdir.", "Victoria Şelalesi'nin diğer yarısı buradadır.", "Bakır madenciliği çok önemlidir."] },
    { id: "NAM", continent: "Africa", name: "Namibya", flag: "🇳🇦", colors: { primary: "#003580", secondary: "#FFCE00", accent: "#DA2128" }, facts: ["Dünyanın en eski çölü Namib buradadır.", "İskelet Sahili gemi enkazlarıyla doludur.", "Ülkenin büyük kısmı doğa koruma alanıdır."] },
    { id: "BOT", continent: "Africa", name: "Botsvana", flag: "🇧🇼", colors: { primary: "#75AADB", secondary: "#000000", accent: "#FFFFFF" }, facts: ["Afrika'nın en eski demokrasisidir.", "Dünyanın en büyük elmas madenlerinden bazılarına sahiptir.", "Fillerin en yoğun olduğu ülkedir."] },
    { id: "LBY", continent: "Africa", name: "Libya", flag: "🇱🇾", colors: { primary: "#E70013", secondary: "#000000", accent: "#239E46" }, facts: ["Leptis Magna antik kenti buradadır.", "Sahra Çölü'nün en sıcak yerlerinden biridir.", "Petrol rezervleri çok zengindir."] },
    { id: "SUD", continent: "Africa", name: "Sudan", flag: "🇸🇩", colors: { primary: "#D21034", secondary: "#FFFFFF", accent: "#007229" }, facts: ["Mısır'dan daha fazla piramide sahiptir.", "Nil Nehri'nin iki kolu Hartum'da birleşir.", "Kızıldeniz'e kıyısı vardır."] },
    { id: "RWA", continent: "Africa", name: "Ruanda", flag: "🇷🇼", colors: { primary: "#00A1DE", secondary: "#FAD201", accent: "#20603D" }, facts: ["Bin Tepeli Ülke olarak bilinir.", "Plastik poşet kullanımı yasaktır.", "Parlamentosunda kadın oranı en yüksek ülkedir."] },
    { id: "BDI", continent: "Africa", name: "Burundi", flag: "🇧🇮", colors: { primary: "#CE1126", secondary: "#1EB53A", accent: "#FFFFFF" }, facts: ["Afrika'nın atan kalbi olarak bilinir.", "Dünyanın en derin ikinci gölü Tanganika buradadır.", "Davul çalmak kutsal bir gelenektir."] },
    { id: "MAD", continent: "Africa", name: "Madagaskar", flag: "🇲🇬", colors: { primary: "#FFFFFF", secondary: "#FC3D32", accent: "#007E3A" }, facts: ["Lemurların dünyadaki tek doğal yaşam alanıdır.", "Baobab ağaçları ile ünlüdür.", "Dünyanın en büyük dördüncü adasıdır."] },
    { id: "MLI", continent: "Africa", name: "Mali", flag: "🇲🇱", colors: { primary: "#14B53A", secondary: "#FCD116", accent: "#CE1126" }, facts: ["Timbuktu antik kenti buradadır.", "Dünyanın en büyük kerpiç binası Cenne Ulu Camii buradadır.", "Mansa Musa tarihin en zengin insanıydı."] },
    { id: "NIG", continent: "Africa", name: "Nijer", flag: "🇳🇪", colors: { primary: "#E05206", secondary: "#FFFFFF", accent: "#0DB02B" }, facts: ["Uranyum üretiminde dünya liderlerindendir.", "Dinozor fosilleri açısından zengindir.", "Adını Nijer Nehri'nden alır."] },
    { id: "BUR", continent: "Africa", name: "Burkina Faso", flag: "🇧🇫", colors: { primary: "#EF2B2D", secondary: "#009E49", accent: "#FCD116" }, facts: ["Dürüst İnsanlar Ülkesi anlamına gelir.", "Afrika'nın sinema başkenti olarak bilinir.", "Timsahlar kutsal kabul edilir."] },
    { id: "GUI", continent: "Africa", name: "Gine", flag: "🇬🇳", colors: { primary: "#CE1126", secondary: "#FCD116", accent: "#009460" }, facts: ["Batı Afrika'nın su kulesi olarak bilinir.", "Boksit rezervlerinde dünya lideridir.", "Nimba Dağı UNESCO mirasıdır."] },
    { id: "BEN", continent: "Africa", name: "Benin", flag: "🇧🇯", colors: { primary: "#008751", secondary: "#FCD116", accent: "#E8112D" }, facts: ["Vudu inancının doğduğu yerdir.", "Dahomey Krallığı'nın merkezidir.", "Ganvie, Afrika'nın Venedik'i olarak bilinir."] },

    // Oceania & Others (18)
    { id: "AUS", continent: "Oceania", name: "Avustralya", flag: "🇦🇺", colors: { primary: "#012169", secondary: "#FFFFFF", accent: "#E4002B" }, facts: ["Kanguruların sayısı insanlardan fazladır.", "Büyük Bariyer Resifi uzaydan görülebilir.", "Dünyanın en büyük adası ve en küçük kıtasıdır."] },
    { id: "NZL", continent: "Oceania", name: "Yeni Zelanda", flag: "🇳🇿", colors: { primary: "#00247D", secondary: "#FFFFFF", accent: "#CC142B" }, facts: ["Yüzüklerin Efendisi burada çekilmiştir.", "Kivi kuşu ulusal semboldür.", "Dünyada gün doğumunu gören ilk ülkelerdendir."] },
    { id: "FIJ", continent: "Oceania", name: "Fiji", flag: "🇫🇯", colors: { primary: "#68BFE5", secondary: "#FFFFFF", accent: "#012169" }, facts: ["333 adadan oluşur.", "Bula! en yaygın selamlama kelimesidir.", "Rugby milli spordur."] },
    { id: "PNG", continent: "Oceania", name: "Papua Yeni Gine", flag: "🇵🇬", colors: { primary: "#000000", secondary: "#CE1126", accent: "#FCD116" }, facts: ["800'den fazla dil konuşulur.", "Zehirli kuşların yaşadığı nadir yerlerdendir.", "Kabile kültürü hala çok canlıdır."] },
    { id: "SAM", continent: "Oceania", name: "Samoa", flag: "🇼🇸", colors: { primary: "#CE1126", secondary: "#002B7F", accent: "#FFFFFF" }, facts: ["Dövme kültürü (Tatau) binlerce yıllıktır.", "Zaman dilimini değiştirip günü atlayan ülkedir.", "Erkekler geleneksel lavalava eteği giyer."] },
    { id: "TON", continent: "Oceania", name: "Tonga", flag: "🇹🇴", colors: { primary: "#C8102E", secondary: "#FFFFFF", accent: "#C8102E" }, facts: ["Polinezya'daki tek krallıktır.", "Pazar günleri iş yapmak yasaktır.", "Kaptan Cook buraya 'Dost Adalar' demiştir."] },
    { id: "VAN", continent: "Oceania", name: "Vanuatu", flag: "🇻🇺", colors: { primary: "#009543", secondary: "#000000", accent: "#D21034" }, facts: ["Bungee jumping'in ilkel versiyonu burada doğmuştur.", "Aktif yanardağı Yasur turistlere açıktır.", "Su altı postanesi vardır."] },
    { id: "SOL", continent: "Oceania", name: "Solomon Adaları", flag: "🇸🇧", colors: { primary: "#0051BA", secondary: "#215B33", accent: "#FCD116" }, facts: ["İkinci Dünya Savaşı'nın önemli cephelerindendir.", "Dalış turizmi için harika batıklara sahiptir.", "İkizler Adası olarak bilinir."] },
    { id: "NCL", continent: "Oceania", name: "Yeni Kaledonya", flag: "🇳🇨", colors: { primary: "#009543", secondary: "#ED4135", accent: "#FFCE00" }, facts: ["Dünyanın en büyük lagününe sahiptir.", "Fransa'ya bağlı özel bir bölgedir.", "Kalp şeklinde bir mangrov ormanı vardır."] },
    { id: "FPO", continent: "Oceania", name: "Fransız Polinezyası", flag: "🇵🇫", colors: { primary: "#ED2939", secondary: "#FFFFFF", accent: "#002395" }, facts: ["Bora Bora ve Tahiti buradadır.", "Siyah incileri ile ünlüdür.", "Su üstü bungalovlar burada icat edilmiştir."] },
    { id: "GUM", continent: "Oceania", name: "Guam", flag: "🇬🇺", colors: { primary: "#013F87", secondary: "#C8102E", accent: "#FFFFFF" }, facts: ["Amerika'nın gününün başladığı yerdir.", "Mercan resifleri çok zengindir.", "Chamorro kültürü hakimdir."] },
    { id: "MHL", continent: "Oceania", name: "Marshall Adaları", flag: "🇲🇭", colors: { primary: "#003A70", secondary: "#FFFFFF", accent: "#DD7500" }, facts: ["Biki Atolü nükleer testleriyle bilinir.", "Dünyanın en büyük köpekbalığı koruma alanıdır.", "1000'den fazla adadan oluşur."] },
    { id: "FSM", continent: "Oceania", name: "Mikronezya", flag: "🇫🇲", colors: { primary: "#75B2DD", secondary: "#FFFFFF", accent: "#75B2DD" }, facts: ["Taş para (Rai) kullanılan tek yerdir.", "Chuuk Lagünü batık gemi cennetidir.", "4 farklı eyaletten oluşur."] },
    { id: "PLW", continent: "Oceania", name: "Palau", flag: "🇵🇼", colors: { primary: "#4AADD6", secondary: "#FFDE00", accent: "#4AADD6" }, facts: ["Denizanaları Gölü'nde zararsız denizanalarıyla yüzebilirsiniz.", "Köpekbalığı sığınağı ilan eden ilk ülkedir.", "Bayrağı dolunayı temsil eder."] },
    { id: "KIR", continent: "Oceania", name: "Kiribati", flag: "🇰🇮", colors: { primary: "#CE1126", secondary: "#FCD116", accent: "#003F87" }, facts: ["4 farklı yarım kürede toprağı olan tek ülkedir.", "Yılbaşını ilk kutlayan ülkedir.", "İklim değişikliği tehdidi altındadır."] },
    { id: "TUV", continent: "Oceania", name: "Tuvalu", flag: "🇹🇻", colors: { primary: "#012169", secondary: "#FFE900", accent: "#012169" }, facts: ["Dünyanın en az ziyaret edilen ülkelerindendir.", ".tv alan adı ülkenin en büyük gelir kaynağıdır.", "Deniz seviyesinden sadece 4.5 metre yüksektedir."] },
    { id: "NAU", continent: "Oceania", name: "Nauru", flag: "🇳🇷", colors: { primary: "#002B7F", secondary: "#FFC61E", accent: "#FFFFFF" }, facts: ["Dünyanın en küçük cumhuriyetidir.", "Başkenti olmayan tek ülkedir.", "Fosfat madenciliği ile zenginleşip fakirleşmiştir."] },
    { id: "COK", continent: "Oceania", name: "Cook Adaları", flag: "🇨🇰", colors: { primary: "#012169", secondary: "#FFFFFF", accent: "#E4002B" }, facts: ["Kendi paraları ve pulları çok renklidir.", "Hiç trafik ışığı yoktur.", "Siyah inciler buraya özgüdür."] }
];

/**
 * Tournament configuration - continent quotas for 32-team tournament
 * @constant {Object}
 */
export const CONTINENT_QUOTAS = {
    'Europe': 8,
    'Asia': 8,
    'Africa': 8,
    'Americas': 5,
    'Oceania': 3
};

/**
 * Selects random countries respecting continent quotas
 * @param {number} [count=32] - Number of countries to select
 * @param {Object|null} [firstSelectedCountry=null] - Pre-selected country to include
 * @returns {Array<Object>} Array of selected country objects
 * @example
 * // Get 32 random countries with quotas
 * const countries = getRandomCountries(32);
 * 
 * // Smart fill with Turkey pre-selected
 * const turkey = COUNTRIES.find(c => c.id === 'TUR');
 * const countries = getRandomCountries(32, turkey);
 */
export function getRandomCountries(count = 32, firstSelectedCountry = null) {
    // Continent quotas for 32 teams
    const quotas = { ...CONTINENT_QUOTAS };

    if (count === 32) {
        let selected = [];
        const regions = ["Europe", "Asia", "Africa", "Americas", "Oceania"];

        // If a country is already selected, include it and reduce quota for its region
        if (firstSelectedCountry) {
            selected.push(firstSelectedCountry);
            const region = firstSelectedCountry.continent;
            if (quotas[region] > 0) {
                quotas[region]--;
            }
        }

        // Select for each region
        regions.forEach(region => {
            const regionCountries = COUNTRIES.filter(c =>
                c.continent === region &&
                (!firstSelectedCountry || c.id !== firstSelectedCountry.id)
            );
            const shuffled = [...regionCountries].sort(() => Math.random() - 0.5);
            const quota = quotas[region];
            selected = selected.concat(shuffled.slice(0, quota));
        });

        // Add remaining if any (shouldn't be needed if data is correct, but safety net)
        if (selected.length < count) {
            const remaining = COUNTRIES.filter(c => !selected.includes(c));
            const shuffledRemaining = [...remaining].sort(() => Math.random() - 0.5);
            selected = selected.concat(shuffledRemaining.slice(0, count - selected.length));
        }

        // Final shuffle, but keep firstSelectedCountry at index 0 if provided
        if (firstSelectedCountry) {
            const firstCountry = selected[0];
            const rest = selected.slice(1);
            const shuffledRest = rest.sort(() => Math.random() - 0.5);
            return [firstCountry, ...shuffledRest];
        }

        return selected.sort(() => Math.random() - 0.5);
    }

    // Default behavior for other counts
    const shuffled = [...COUNTRIES].filter(c => !firstSelectedCountry || c.id !== firstSelectedCountry.id).sort(() => Math.random() - 0.5);
    let result = shuffled.slice(0, count);

    if (firstSelectedCountry) {
        // If generic selection but user picked one, add it back (though logic rarely reaches here for tournament)
        result = [firstSelectedCountry, ...result.slice(0, count - 1)];
    }

    return result;
}

/**
 * Finds a country by its ID code
 * @param {string} id - Country ID (e.g., 'TUR', 'USA')
 * @returns {Object|undefined} Country object or undefined if not found
 * @example
 * const turkey = getCountryById('TUR');
 * console.log(turkey.name); // "Türkiye"
 */
export function getCountryById(id) {
    return COUNTRIES.find(c => c.id === id);
}
