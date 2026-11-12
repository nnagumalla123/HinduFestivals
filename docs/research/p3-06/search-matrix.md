# Search alias and deity test matrix (P3-06)

Behavior of `searchFestivals` (names, reviewed aliases and reviewed deity terms) against the ten real records, captured 2026-11-12. The automated version is `tests/festivals/search-matrix.test.ts`.

## 1. Basics per festival (all reviewed)

| Festival | Subtitle | Aliases | Deity search terms | Deity entries (tradition) | Every term has an entry? |
|---|---|---|---|---|---|
| Diwali | The festival of lights | Deepavali | Lakshmi, Rama, Krishna, Kali | Lakshmi (Widespread across Hindu traditions); Rama (Northern India); Krishna (Southern India; Vaishnava traditions); Kali (Bengal) | yes |
| Ugadi | A new year for Telugu and Kannada families | Yugadi | Brahma | Brahma (Traditional belief, as Britannica (some Hindu texts) and community sources describe it) | yes |
| Holi | The festival of colors | none | Krishna, Radha, Vishnu | Krishna (Braj Vaishnava tradition); Radha (Braj Vaishnava tradition); Vishnu (Vaishnava tradition (the Prahlada story)) | yes |
| Ganesh Chaturthi | A festival honoring the birth of Ganesha | Vinayaka Chaturthi | Ganesha, Parvati, Shiva | Ganesha (Hindu traditions; Puranic birth stories vary); Parvati (Puranic tradition; versions vary); Shiva (Puranic tradition; versions vary) | yes |
| Navaratri | Nine nights honoring the goddess | Navratri | Durga, Lakshmi, Saraswati | Durga (Shakta and wider Hindu traditions); Lakshmi (Three-phase scheme (Durga, Lakshmi, Saraswati)); Saraswati (Three-phase scheme; South India (ninth day)) | yes |
| Vijayadashami | The victorious tenth day | Dussehra, Dasara, Vijaya Dashami | Rama, Durga | Rama (Vaishnava tradition; the Ramayana); Durga (Shakta tradition; Durga Puja in the east); Chamundeshwari (Mysuru and Karnataka) | yes |
| Krishna Janmashtami | A festival honoring the birth of Krishna | Janmashtami, Gokulashtami | Krishna, Vishnu | Krishna (Vaishnava traditions; Bhagavata Purana); Vishnu (Vaishnava tradition; Bhagavata Purana) | yes |
| Maha Shivaratri | The great night of Shiva | Shivaratri, Mahashivratri, Maha Shivratri | Shiva, Parvati | Shiva (Shaiva and wider Hindu traditions); Parvati (Varies by community) | yes |
| Makara Sankranti | A solar festival of harvest and renewal | Sankranti, Makar Sankranti | Surya | Surya (Hindu traditions across India); Indra (Tamil Pongal) | yes |
| Rama Navami | A festival honoring the birth of Rama | Ram Navami, Sri Rama Navami | Rama, Sita, Hanuman | Rama (Vaishnava and wider Hindu traditions); Sita (South India and the diaspora); Hanuman (Hindu traditions across India) | yes |

## 2. Query results

| Query | Results (match explanation) |
|---|---|
| `holi` | Holi |
| `Diwali` | Diwali |
| `deepavali` | Diwali [alias:Deepavali] |
| `diwali lakshmi` | Diwali |
| `lakshmi` | Diwali [deity:Lakshmi] ; Navaratri [deity:Lakshmi] |
| `yugadi` | Ugadi [alias:Yugadi] |
| `ugadi` | Ugadi |
| `brahma` | Ugadi [deity:Brahma] |
| `ganesh` | Ganesh Chaturthi |
| `ganesha` | Ganesh Chaturthi [deity:Ganesha] |
| `vinayaka` | Ganesh Chaturthi [alias:Vinayaka Chaturthi] |
| `vinayaka chaturthi` | Ganesh Chaturthi [alias:Vinayaka Chaturthi] |
| `ganesha chaturthi` | Ganesh Chaturthi |
| `parvati` | Ganesh Chaturthi [deity:Parvati] ; Maha Shivaratri [deity:Parvati] |
| `shiva` | Ganesh Chaturthi [deity:Shiva] ; Maha Shivaratri |
| `navaratri` | Navaratri |
| `navratri` | Navaratri [alias:Navratri] |
| `durga` | Navaratri [deity:Durga] ; Vijayadashami [deity:Durga] |
| `saraswati` | Navaratri [deity:Saraswati] |
| `vijayadashami` | Vijayadashami |
| `vijaya dashami` | Vijayadashami [alias:Vijaya Dashami] |
| `dussehra` | Vijayadashami [alias:Dussehra] |
| `dasara` | Vijayadashami [alias:Dasara] |
| `dusshera` | (no results) |
| `bijoya` | (no results) |
| `rama` | Diwali [deity:Rama] ; Vijayadashami [deity:Rama] ; Rama Navami |
| `ram navami` | Rama Navami [alias:Ram Navami] |
| `sita` | Rama Navami [deity:Sita] |
| `hanuman` | Rama Navami [deity:Hanuman] |
| `ravana` | (no results) |
| `krishna` | Diwali [deity:Krishna] ; Holi [deity:Krishna] ; Krishna Janmashtami |
| `radha` | Holi [deity:Radha] |
| `vishnu` | Holi [deity:Vishnu] ; Krishna Janmashtami [deity:Vishnu] |
| `janmashtami` | Krishna Janmashtami |
| `gokulashtami` | Krishna Janmashtami [alias:Gokulashtami] |
| `krishna jayanthi` | (no results) |
| `shivaratri` | Maha Shivaratri |
| `mahashivratri` | Maha Shivaratri [alias:Mahashivratri] |
| `shivratri` | Maha Shivaratri [alias:Mahashivratri] |
| `maha` | Maha Shivaratri |
| `makar sankranti` | Makara Sankranti [alias:Makar Sankranti] |
| `makara sankranti` | Makara Sankranti |
| `sankranti` | Makara Sankranti |
| `pongal` | (no results) |
| `lohri` | (no results) |
| `uttarayan` | (no results) |
| `surya` | Makara Sankranti [deity:Surya] |
| `indra` | (no results) |
| `kali` | Diwali [deity:Kali] |
| `holika dahan` | (no results) |
| `kama` | (no results) |
| `mahishasura` | (no results) |
| `chamundeshwari` | (no results) |
| `sri rama navami` | Rama Navami [alias:Sri Rama Navami] |
| `new year` | (no results) |
| `festival of lights` | (no results) |
| `colors` | (no results) |
| `chaturthi` | Ganesh Chaturthi |
| `navami` | Rama Navami |
| `dashami` | Vijayadashami |
| `ashtami` | Krishna Janmashtami |
| `xyz` | (no results) |
| `(spaces only)` | Diwali ; Ugadi ; Holi ; Ganesh Chaturthi ; Navaratri ; Vijayadashami ; Krishna Janmashtami ; Maha Shivaratri ; Makara Sankranti ; Rama Navami |
| `a` | Diwali ; Ugadi ; Holi [deity:Krishna] ; Ganesh Chaturthi ; Navaratri ; Vijayadashami ; Krishna Janmashtami ; Maha Shivaratri ; Makara Sankranti ; Rama Navami |

## 3. Observations

- Every deity search term is backed by an attributed deity entry (also enforced by the content tests); every alias shows as "Matched other name" and every deity term as "Matched search term", with no provisional flag now that all basics are reviewed.
- **Works as intended:** reviewed aliases (Deepavali, Yugadi, Vinayaka Chaturthi, Navratri, Dussehra, Dasara, Vijaya Dashami, Gokulashtami, Janmashtami, Ram Navami, Mahashivratri, Makar Sankranti and the others), deity terms (Lakshmi, Brahma, Ganesha, Parvati, Shiva, Durga, Saraswati, Rama, Sita, Hanuman, Krishna, Radha, Vishnu, Surya, Kali), partial names, case and spelling variants that normalize (Shivratri via Mahashivratri), empty and single-letter queries.
- **Gaps (all S3, no wrong results):** Dusshera (the HAF spelling), Bijoya and Krishna Jayanthi return nothing; Pongal, Lohri and Uttarayan return nothing because the owner kept them as related festivals, not aliases of Makara Sankranti (the guide covers Pongal and Lohri in detail); Ravana, Holika Dahan, Kama, Mahishasura, Chamundeshwari and Indra are story figures with no search term; subtitles are not searched ("festival of lights", "colors", "new year" return nothing).
- **Quirks:** "Ashtami", "Navami" and "Dashami" match the festivals whose names contain them ("Janmashtami", "Rama Navami", "Vijayadashami"); "Shiva" lists Ganesh Chaturthi (a deity term) beside Maha Shivaratri.
