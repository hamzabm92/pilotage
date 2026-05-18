# Dashboard Security Interface

_Started 2026-05-18 12:34 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Pilotage de trajectoire"
Current date is now May 18, 2026
</system-info>

<default aesthetic>
If no references, art direction or design systems were provided, use this default professional modern, minimal aesthetic as a base. Declare your choice out loud so you stick to it. Guidance:
- Choose a type pairing from web-safe set or Google Fonts. Helvetica is a good choice. Avoid hard-to-read or overly stylized fonts. Use 1-3 fonts only.
- Foreground and background: choose a color tone (warm, cool, neutral, something in-between). Use subtly-toned whites and blacks; avoid saturations above 0.02 for whites.
- Accents: choose 0-2 additional accent colors using oklch. All accents should share same chroma and lightness; vary hue.
- NEVER write out an SVG yourself that's more complicated than a square, circle, diamond, etc.
- For imagery, never hand-draw SVGs; use subtly-striped SVG placeholders instead with monospace explainers for what should be dropped there (e.g. “product shot”)

CRITICAL: ignore default aesthetic entirely if given other aesthetic instructions like reference images, design systems or guidance, or if there are files in the project already.
</default aesthetic>

<pasted_text name="Pasted text (54 lines)">
Prototype a personal financial dashboard app called "Pilotage" for a French SASU freelance consultant.
Visual identity: Off-white background #F7F5EF, dark text #1A1A1A. Two persistent color identities throughout the entire app: blue #2563EB = PRO (SASU), violet #7C3AED = PERSO. Green #1F9D55 = safe, amber #F59E0B = watch, red #DC2626 = risk. Card-based layout, premium minimal feel. Linear meets Finary.

Bottom tab bar — 3 tabs only:

Dashboard (active, home icon)
PRO (briefcase icon, blue)
PERSO (person icon, violet)


Screen to prototype: Dashboard
The dashboard has 3 sections clearly separated by a section header:
Section 1 — Vue globale
One full-width card showing:

Net worth total (large bold number)
Two side-by-side sub-cards inside:

Left: blue-bordered PRO — Trésorerie SASU + Investissements SASU
Right: violet-bordered PERSO — Cash perso + ETF perso + Appartement Tanger


A thin divider, then: Net worth estimé : X €

Section 2 — Score de sécurité
One card with a circular gauge (0–100), color green/amber/red. Below: one short copilot sentence in French. e.g. "Situation saine, mais mission à surveiller après mars 2027."
Section 3 — Résumé PRO / Résumé PERSO
Two cards side by side (or stacked):

Résumé PRO (blue left border): Trésorerie SASU, Runway société, DCA SASU, Prochain dividende estimé
Résumé PERSO (violet left border): Cash dispo, Runway perso, DCA PEA, Objectif 2027


Tab PRO (blue theme)
Full screen with:

TJM, jours/mois, CA mensuel estimé, mission sécurisée jusqu'à
Trésorerie SASU (brut / libre après obligations)
DCA IBKR : 1 000 €/mois
Simulateur dividende : entrée montant brut → net estimé, cash restant, niveau de risque
Runway SASU (mois sans CA)

Tab PERSO (violet theme)
Full screen with:

Patrimoine financier perso total
Breakdown: PEA 4 336 €, Revolut Trading 6 208 €, eToro 12 370 €, Cash 16 000 €
DCA PEA : 550 €/mois
Appartement Tanger : 85 000 € total, 35 000 € versé, 50 000 € restant
Runway perso (mois de cash disponible)
Objectif 2027 progress bar


Specs: Mobile-first ~390px. All labels in French. Real app feel, not a wireframe. Use realistic placeholder numbers throughout.
</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Wireframe">
Help the user explore design ideas quickly. Interview them, then generate multiple rough wireframes to map out the design space before committing to a direction. Prioritize breadth over polish: show 3-5 distinctly different approaches for each idea. Use simple shapes, placeholder text, and minimal color to keep the focus on structure and flow. Use a sketchy vibe -- handwritten but readable fonts; b&w with some color; low-fi and simple. Provide simple tweaks; show options side-by-side if small or using a tab control if large.
</attached-skill>


<system-reminder>Auto-injected reminder (ignore if not relevant): do not recreate copyrighted or branded UI unless the user's email domain matches that company. Create original designs instead.</system-reminder>

## Assistant

_[tool: questions_v2]_

## User

Questions answered:
- scope: All three (Dashboard, PRO, PERSO)
- variation_count: Decide for me
- exploration_axes: PRO vs PERSO separation strategy (split vs unified vs toggle), Score de sécurité visualization (gauge vs bar vs ring vs other), Decide for me
- sketch_vibe: 2
- color_in_sketch: Decide for me
- tweaks_focus: Decide for me
- font_vibe: Decide for me
- frame: Decide for me

## Assistant

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

_[tool: grep]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: done]_

_[tool: update_todos]_

_[tool: fork_verifier_agent]_

Wireframes are up. Six sketches on a pan/zoom canvas:

**Dashboard — 4 variations** exploring two axes (PRO/PERSO separation × score viz):
- **V1** classic stacked + circular gauge (PRO/PERSO sub-cards nested inside Vue globale)
- **V2** hard 2-column split throughout + horizontal thermometer bar
- **V3** segmented `Tout / PRO / PERSO` toggle + split donut gauge
- **V4** score-led hero with a big radial dial, money below

**Tabs** — PRO (TJM, trésorerie, DCA, simulateur dividende avec slider, runway) and PERSO (patrimoine financier, breakdown PEA/eToro/Revolut/Cash, DCA PEA, Tanger, runway, objectif 2027).

**Tweaks** (toolbar toggle):
- Scénario : Saine / À surveiller / Risque — recalculates every screen
- Accents PRO/PERSO on/off (collapses to pure B&W)
- Annotations & marges on/off

Drag artboards to reorder, double-click labels to rename, click any artboard to focus it fullscreen.

Next: pick a direction (or mix — e.g. V2's net-worth banner + V1's nested card + V4's dial) and I'll bump fidelity, add detail screens (mission, ajout dividende, paramètres), and tighten copy.

## User

<system-info comment="Only acknowledge these if relevant">
User is viewing file: index.html
</system-info>

<pasted_text name="Pasted text (648 lines)">
Oui, dans ce cas il faut penser l’application comme un **produit grand public**, pas comme “l’app de Hamza”.

L’idée devient :

> **Une application où chaque utilisateur crée son compte, renseigne sa situation pro/perso, puis obtient un cockpit financier personnalisé.**

Le produit ne doit donc pas être centré sur “SASU + Tanger + mission Technip”, mais sur des **profils financiers modulaires**.

---

# 1. Le positionnement de l’app

Je la positionnerais comme :

## **Le cockpit financier pour indépendants, freelances, dirigeants et salariés ambitieux**

Promesse simple :

> **Visualise ton patrimoine, sécurise ton cash, simule tes décisions et construis ta trajectoire financière.**

Pas une app de banque.
Pas une app de compta.
Pas une app de trading.

Plutôt une app de **pilotage de trajectoire financière personnelle et professionnelle**.

---

# 2. Le parcours utilisateur

## Étape 1 — Création du compte

L’utilisateur crée un compte avec :

* email ;
* mot de passe ;
* pays de résidence ;
* devise principale ;
* statut principal.

Exemples de statuts :

* salarié ;
* freelance micro-entreprise ;
* freelance société ;
* dirigeant SASU/EURL/SARL ;
* investisseur ;
* entrepreneur ;
* mixte.

Dès le départ, l’app doit comprendre le profil.

---

## Étape 2 — Onboarding intelligent

L’onboarding doit poser peu de questions, mais les bonnes.

### Questions principales

**Quel est ton profil ?**

* Je suis salarié
* Je suis freelance
* J’ai une société
* J’ai des revenus mixtes
* Je veux juste suivre mon patrimoine

**Quels comptes veux-tu suivre ?**

* compte courant perso ;
* épargne ;
* PEA / CTO / assurance-vie ;
* crypto ;
* compte société ;
* immobilier ;
* dettes / crédits ;
* objectifs à financer.

**Quel est ton objectif principal ?**

* sécuriser ma trésorerie ;
* acheter un bien immobilier ;
* investir régulièrement ;
* sortir des dividendes ;
* préparer une période sans revenu ;
* construire ma liberté financière ;
* suivre mon patrimoine global.

L’app doit ensuite générer un dashboard adapté.

---

# 3. Les modules universels

Pour que ce soit tout public, il faut construire l’app en modules activables.

## Module 1 — Patrimoine personnel

Pour tout le monde.

L’utilisateur entre :

* cash ;
* comptes épargne ;
* PEA ;
* CTO ;
* assurance-vie ;
* crypto ;
* immobilier ;
* dettes ;
* crédits ;
* autres actifs.

L’app calcule :

* patrimoine brut ;
* dettes ;
* patrimoine net ;
* part cash ;
* part investie ;
* évolution mensuelle.

---

## Module 2 — Revenus

L’utilisateur peut ajouter plusieurs sources :

* salaire ;
* mission freelance ;
* dividendes ;
* revenus locatifs ;
* side business ;
* allocations ;
* autres.

Chaque revenu a :

* montant ;
* fréquence ;
* certitude ;
* date de fin éventuelle ;
* statut fiscal approximatif.

Très important : la notion de **certitude du revenu**.

Exemple :

| Revenu            |       Montant | Stabilité |
| ----------------- | ------------: | --------- |
| CDI               |  3 000 €/mois | élevée    |
| Mission freelance | 10 000 €/mois | moyenne   |
| Dividendes        |      variable | faible    |
| Location          |    800 €/mois | moyenne   |

---

## Module 3 — Dépenses et runway

Pas besoin de micro-budget au début.

L’utilisateur entre surtout :

* dépenses fixes mensuelles ;
* dépenses variables moyennes ;
* loyer/crédit ;
* charges familiales ;
* impôts estimés ;
* dépenses exceptionnelles prévues.

L’app calcule :

> **Combien de mois je peux tenir sans revenu ?**

C’est un indicateur central.

---

## Module 4 — Investissements / DCA

L’utilisateur renseigne :

* montant investi par mois ;
* support ;
* compte utilisé ;
* niveau de risque ;
* automatique ou manuel.

Exemples :

| Support        | Montant mensuel |
| -------------- | --------------: |
| PEA MSCI World |           550 € |
| CTO ETF        |           300 € |
| Crypto         |           100 € |
| Société IBKR   |         1 000 € |

L’app doit dire :

* DCA total mensuel ;
* pourcentage du revenu investi ;
* impact sur le cash ;
* soutenabilité du rythme.

---

## Module 5 — Société / activité pro

Ce module doit être optionnel.

Pour les freelances en société, l’utilisateur ajoute :

* structure : SASU, EURL, SARL, micro, autre ;
* trésorerie actuelle ;
* chiffre d’affaires mensuel estimé ;
* TJM ;
* jours facturés ;
* charges ;
* TVA ;
* IS ;
* rémunération ;
* dividendes prévus ;
* investissements société.

L’app calcule :

* trésorerie disponible ;
* runway société ;
* dividende brut/net estimé ;
* cash réellement libre ;
* risque si mission arrêtée.

C’est ton avantage différenciant par rapport aux apps grand public classiques.

---

## Module 6 — Objectifs

Chaque utilisateur doit pouvoir créer des objectifs.

Exemples :

* acheter un appartement ;
* constituer 20k€ de sécurité ;
* investir 100k€ ;
* sortir 50k€ de dividendes ;
* financer un congé sabbatique ;
* créer une entreprise ;
* rembourser une dette ;
* atteindre 500 €/mois de revenus passifs.

Chaque objectif a :

* montant cible ;
* date cible ;
* priorité ;
* source de financement ;
* progression.

---

# 4. Le dashboard universel

L’écran d’accueil doit s’adapter au profil, mais garder la même logique.

## Carte 1 — Situation nette

> **Patrimoine net estimé : X €**

Avec détail :

* cash ;
* investissements ;
* immobilier ;
* société ;
* dettes.

## Carte 2 — Sécurité

> **Runway personnel : X mois**
> **Runway professionnel : X mois**, si applicable.

## Carte 3 — Objectif principal

Exemple :

> **Objectif appartement : 42 % financé**

ou

> **Objectif liberté financière : 18 % atteint**

## Carte 4 — Investissements

> **DCA mensuel : X €**

Avec statut :

* confortable ;
* soutenu ;
* agressif ;
* à réduire.

## Carte 5 — Recommandation

Une phrase simple :

> **Ta situation est saine. Ton cash couvre 8 mois de dépenses et ton DCA représente 18 % de tes revenus.**

ou

> **Attention : ton objectif immobilier arrive dans 8 mois et ton cash disponible est insuffisant. Réduis temporairement ton DCA.**

C’est cette phrase qui donne de la valeur.

---

# 5. Les scénarios : le cœur du produit

Pour être vraiment utile, l’app doit permettre à l’utilisateur de simuler des décisions.

Exemples :

## Scénario revenu

> Et si je perds ma mission dans 3 mois ?

## Scénario investissement

> Et si je baisse mon DCA de 1 000 € à 500 € ?

## Scénario dividende

> Combien dois-je distribuer en brut pour recevoir 50k€ net ?

## Scénario immobilier

> Est-ce que je peux acheter ce bien sans vider mon cash ?

## Scénario liberté financière

> Combien dois-je investir par mois pour atteindre 500 €/mois de revenus passifs ?

L’app ne doit pas juste afficher des chiffres.
Elle doit aider à prendre une décision.

---

# 6. Les écrans de l’app

Je ferais cette structure :

## 1. Dashboard

Vue globale.

## 2. Comptes

Tous les comptes et actifs.

## 3. Revenus

Salaires, missions, dividendes, revenus locatifs.

## 4. Dépenses

Dépenses mensuelles et obligations futures.

## 5. Objectifs

Immobilier, sécurité, investissement, liberté financière.

## 6. Scénarios

Simulateur de décisions.

## 7. Pro

Module société/freelance, seulement si activé.

## 8. Insights

Conseils personnalisés et alertes.

---

# 7. Le design UX

Je ferais un design très simple, rassurant et premium.

Pas trop “banque”.
Pas trop “crypto”.
Pas trop “Excel”.

Plutôt :

**Finary + Qonto + Notion + Linear**

L’app doit donner une impression de :

* contrôle ;
* clarté ;
* calme ;
* progression ;
* sécurité.

## Style visuel

* fond clair ;
* cartes arrondies ;
* chiffres très lisibles ;
* graphiques simples ;
* peu de couleurs ;
* beaucoup d’espace ;
* messages courts.

## Couleurs par univers

| Univers       | Couleur           |
| ------------- | ----------------- |
| Personnel     | violet            |
| Professionnel | bleu              |
| Sécurité      | vert              |
| Vigilance     | orange            |
| Risque        | rouge             |
| Objectifs     | noir / doré sobre |

---

# 8. La logique de personnalisation

L’app doit fonctionner par profils.

## Profil salarié

L’app montre surtout :

* salaire ;
* épargne ;
* investissements ;
* objectifs ;
* runway perso.

## Profil freelance micro

L’app ajoute :

* CA ;
* charges ;
* impôt ;
* revenu net estimé ;
* mois sans mission.

## Profil dirigeant SASU/EURL

L’app ajoute :

* trésorerie société ;
* dividendes ;
* salaire ;
* charges ;
* fiscalité ;
* runway société.

## Profil investisseur immobilier

L’app ajoute :

* biens ;
* loyers ;
* crédits ;
* rendement ;
* cash-flow locatif.

## Profil mixte

L’app combine tout.

C’est exactement ton cas.

---

# 9. Les données à demander au départ

Il ne faut pas demander trop d’informations au début. Sinon les gens abandonnent.

Je ferais un onboarding en 10 minutes max.

### Obligatoire au début

* pays ;
* devise ;
* statut ;
* revenus mensuels ;
* dépenses mensuelles ;
* cash disponible ;
* investissements actuels ;
* DCA mensuel ;
* objectifs principaux.

### Optionnel ensuite

* détail des comptes ;
* fiscalité ;
* société ;
* immobilier ;
* dettes ;
* transactions bancaires ;
* projection avancée.

Le principe :

> **Simple au départ, puissant ensuite.**

---

# 10. MVP à construire

Pour une première version grand public, je construirais ça :

## MVP V1

1. Création de compte
2. Onboarding financier
3. Dashboard personnalisé
4. Comptes / actifs
5. Objectifs
6. DCA mensuel
7. Runway personnel
8. Simulateur simple
9. Module société basique
10. Export PDF / Excel

Pas besoin au début de connexion bancaire automatique.
Tu peux commencer avec de la saisie manuelle propre.

C’est beaucoup plus simple à construire et à tester.

---

# 11. Ce qui différencierait ton app

Le marché a déjà beaucoup d’apps de budget, de patrimoine ou de trading.

Ta différence pourrait être :

## **L’app qui relie vie perso + activité pro + décisions futures.**

Beaucoup d’outils montrent :

> “Voici ton argent.”

Mais peu répondent à :

> “Est-ce que je peux sortir ce cash ?”
> “Est-ce que je peux investir plus ?”
> “Est-ce que je suis en danger si ma mission s’arrête ?”
> “Est-ce que mon objectif immobilier est finançable ?”
> “Combien dois-je garder en sécurité ?”

C’est là que ton produit peut être fort.

---

# 12. Exemple d’expérience utilisateur

L’utilisateur arrive.

Il crée son compte.

Il dit :

> Je suis freelance en SASU.

Il renseigne :

* TJM ;
* jours facturés ;
* trésorerie société ;
* salaire ;
* cash perso ;
* investissements ;
* objectifs.

L’app lui dit :

> **Tu as 9 mois de sécurité personnelle et 7 mois de sécurité professionnelle. Ton DCA actuel est soutenable. Tu peux sortir environ 35k€ net sans passer sous ton seuil de sécurité.**

Puis il simule :

> Je veux acheter un appartement à 85k€.

L’app répond :

> **L’achat est possible, mais il faudrait réduire temporairement ton DCA de 2 000 € à 1 000 €/mois pour préserver ta sécurité.**

C’est exactement le type de conseil que tu cherches.

---

# 13. Le produit final que j’imagine

Nom possible :

* **Trajectory**
* **Runway**
* **Pilot**
* **Wealth Pilot**
* **FinPilot**
* **CapPilot**
* **Patrimoine Pilot**
* **Trajectoire**

Positionnement :

> **Le cockpit financier qui t’aide à piloter ton patrimoine, ton cash et tes objectifs de vie.**

Promesse :

> **Sache combien tu peux dépenser, investir ou sortir de ta société sans mettre ta sécurité en danger.**

Cible initiale idéale :

> **Freelances, consultants, dirigeants de petites sociétés, entrepreneurs solos.**

Puis extension :

> Salariés, investisseurs immobiliers, couples, familles.

---

## Mon avis final

Oui, tu peux en faire une app tout public.

Mais ne commence pas trop large. Le meilleur angle serait :

# **Une app de pilotage financier pour indépendants et dirigeants, avec une vue perso + pro.**

C’est assez grand pour être un vrai marché, mais assez spécifique pour être différenciant.

Ensuite, tu peux ouvrir à tous les profils avec des modules.

Le cœur du produit doit rester :

> **Un utilisateur crée son compte, entre ses infos, et l’app lui dit s’il est financièrement safe, combien il peut investir, combien il peut sortir, et comment atteindre ses objectifs.**

</pasted_text>

## Assistant

_[tool: update_todos]_

Big pivot — from "Hamza's app" to a public product with profiles, onboarding, modules and scenarios. I'll keep the first wireframes as v0 (specific use case) and add a much broader exploration: onboarding flow, universal dashboard for 3 profiles, module screens, and the killer scenarios feature.

_[tool: str_replace_edit]_

First, update the PhoneFrame to support multiple tab configurations + a no-tab mode for onboarding.

_[tool: write_file]_

Now the onboarding flow.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: str_replace_edit]_

Now update app.jsx to add new sections, reorder so the public app is the focus.

_[tool: write_file]_

_[tool: done]_

_[tool: update_todos]_

_[tool: fork_verifier_agent]_

Pivoté vers le produit grand public. Tout est sur le canvas, organisé en sections du plus stratégique au plus détaillé :

**🗺 Architecture** — diagramme central : Cockpit + 6 modules en spokes + Scénarios en bas (le cœur produit).

**🚪 Onboarding** (6 écrans) — Welcome → Profil (6 archétypes) → Comptes à suivre → Objectif principal → Chiffres clés → Premier insight.

**🎯 Cockpit adaptatif** (3 profils) — A) Salariée Léa (cartes simples, pas de Pro), B) Freelance société Karim (perso + pro, runway double), C) Mixte Sofiane (alerte côté side). Même grammaire de 5 cartes : Situation nette · Sécurité · Objectif principal · Investissements · Copilote.

**🧪 Scénarios** (4 écrans) — index + trois sketches détaillés :
- *Et si je perds ma mission ?* → sliders + projection 12 mois deux courbes + verdict
- *Combien sortir en dividende ?* → input + 3 cartes d'impact (net, cash restant, runway) + jauge risque
- *Puis-je acheter ce bien ?* → inputs + grille d'impacts + verdict + plan B

**📦 Modules** (5 écrans) — Comptes, Revenus (avec chips stabilité), Dépenses & runway (hero 5,7 mois), Objectifs (4 cartes empilées), Insights & alertes (alerte/opportunité/habitude).

**📚 v0 archive** — les 4 dashboards initiaux + onglets PRO/PERSO conservés pour référence.

**📝 Notes designer** — pivot expliqué, système, prochaines étapes.

Tweaks actifs : scénario de données (saine/à surveiller/risque) qui affecte la v0, accents PRO/PERSO on/off.

Dis-moi quelles directions privilégier et je monte en fidélité — typiquement : 1 cockpit + 1 style de scénario à pousser, plus le flow d'activation du module Société.

## User

Le module dividende doit être configurable par pays
La vraie V1 que je construirais

Pour une première vraie version utilisable, je ferais seulement ça :

V1 fonctionnelle
création de compte ;
onboarding ;
ajout manuel des comptes ;
ajout des revenus ;
ajout des dépenses mensuelles ;
ajout des objectifs ;
dashboard personnalisé ;
calcul du runway ;
calcul du DCA total ;
scénario “perte de revenu” ;
scénario “achat immobilier” ;
scénario “dividende” pour profils société.

Pas besoin de connexion bancaire au début.
Pas besoin d’IA avancée.
Pas besoin de 50 graphiques.

Le MVP doit juste répondre à une question :

Est-ce que ma trajectoire est saine ou fragile ?

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

Compris — V1 scope clair, et le module dividende doit être pays-aware. Je vais :

1. Ajouter une étape **« Compte · pays · devise »** dans l'onboarding
2. Rendre le **scénario dividende configurable par pays** (sélecteur + recalcul) + variante visuelle 🇲🇦 Maroc
3. Ajouter une carte **« V1 — scope MVP »** qui matérialise ce que tu viens de définir

_[tool: read_file]_

Let me make the dividende scenario country-aware (interactive), add a Maroc variant, insert a country step in onboarding, and add a V1 scope card.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now add the country onboarding step and renumber the steps.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now create the V1 scope card and wire everything into app.jsx.

_[tool: write_file]_

Now wire everything into index.html and app.jsx.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Ajouts livrés :

**🌍 Module dividende pays-aware** (`sc-div-fr` + `sc-div-ma`)
- Sélecteur de pays en haut (8 régimes : 🇫🇷 PFU 30% · 🇧🇪 30% · 🇲🇦 TPA 15% · 🇪🇸 19-27% · 🇩🇪 26,4% · 🇵🇹 28% · 🇨🇭 35% · 🇬🇧 8,75-39,35%)
- Carte fiscalité affichant le régime, la décomposition (ex. "IR 12,8% + PS 17,2%") et la note réglementaire
- Slider + carte impôt + carte cash restant + carte net qui recalculent en direct
- Devise locale (€ / MAD / CHF / £) propagée partout
- Verdict adaptatif safe/watch/risk selon le runway après distribution
- Variante visuelle 🇲🇦 Maroc en artboard séparé pour comparer

**🚪 Onboarding — nouvelle étape 01** : Compte · pays · devise. Email + mot de passe + chips pays (8 options) + devise + fuseau + note pédagogique sur la fiscalité par défaut. Steps renumérotés 1→6.

**📋 V1 Scope card** — checklist du MVP que tu as défini, dans 4 buckets (Compte & onboarding · Saisie & données · Cockpit & calculs · Scénarios), avec badge "8 pays" sur le dividende. Encart "hors périmètre" barré (connexion bancaire, IA, 50 graphiques, etc). Question centrale soulignée en haut : *« Est-ce que ma trajectoire est saine ou fragile ? »*

Tu peux scroller jusqu'au sommet du canvas pour voir le scope MVP en premier — c'est la vue d'entrée pour valider qu'on est aligné avant de monter en fidélité.

## User

Verifier agent check completed

## Assistant

Verifier passed. Tout est en place — dis-moi quand tu veux pousser une direction en hi-fi (cockpit + scénario clé + flow société par exemple) et je m'en occupe.

