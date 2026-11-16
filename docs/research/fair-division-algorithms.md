# Fair-division algorithms for chores (two agents, no money)

Research ticket: issue #5. Date of search: 2026-11-16.

**Question.** Which fair-division and mechanism-design methods suit allocating indivisible chores between two agents without monetary transfers, which guarantees are achievable for two agents, and at what elicitation cost?

**How to read this file.** Every claim carries a bracketed key that resolves to the reference list, where each entry has an arXiv id, DOI or URL returned by a search tool in this session. Evidence status is marked per reference: *read* (full text retrieved and the cited statement located), *abstract* (only the abstract or a listing was seen), or *reported* (known only through another paper's account of it). Preprints are flagged. Paragraphs headed "Own analysis" are this file's inference and are not results from the literature. All formal results assume **additive** costs (the cost of a bundle is the sum of the costs of its chores) unless stated otherwise.

---

## Short answer

1. **For two agents with additive costs, the strongest one-shot package that is known to be achievable is EF1 plus Pareto optimality**, computed in O(m²) time by a discrete "generalized Adjusted Winner" procedure that needs each partner's numeric cost for every chore [Aziz2019]. Existence of EF1+PO for chores is now proved for any number of agents, and it extends to unequal entitlements (weighted EF1) [Mahara2026]. This is directly relevant because the project's target is the couple's own split, not 50/50.
2. **If only rankings are elicited, EF1 is still achievable (round-robin picking), but Pareto optimality is not guaranteed** [Aziz2019; Amanatidis2023]. With rankings only, even proportionality-up-to-any-chore can only be approximated within a factor of 2, and that factor is tight [LiLiWu2022].
3. **Exact envy-freeness and exact proportionality cannot be guaranteed for a single allocation of indivisible chores** [Mahara2026; AzizLi2026], but they can be guaranteed *over time*: for two agents and an even number of repetitions of the same chore set, a sequence that is envy-free and Pareto optimal overall always exists, and with exactly two rounds every round can also be EF1 [Igarashi2023]. Recurrence is therefore an asset, not a complication.
4. **No truthful (strategy-proof) deterministic mechanism without money is EF1 for two agents once there are five or more chores** [Li2025, building on Amanatidis2017]. Manipulation cannot be designed away; it can only be bounded. Round-robin degrades gracefully for two agents (every pure Nash equilibrium is still EF1, shown for goods) [Amanatidis2026], and round-robin is provably robust to bounded reporting noise (goods) [Dang2026].
5. **The prototype's objective (equalise weighted burden within 15%) is an equitability target, which is a different axiom from envy-freeness.** The two can conflict: there are chore instances where no allocation is simultaneously EQ1, EF1 and PO [Freeman2020]. A fixed percentage tolerance has no counterpart in the literature, where slack is expressed as "up to one chore" (see "Implications").

---

## Comparison of candidate methods

Notation: m = number of chores; EF1/EFX = envy-free up to one/any chore; PROP1/PROPX = proportional up to one/any chore; EQ1/EQX = equitable up to one/any chore; PO = Pareto optimal; fPO = fractionally Pareto optimal.

| Method | Guarantees for two agents (additive costs) | Inputs required | Elicitation burden | Manipulation | Recurring allocation? |
|---|---|---|---|---|---|
| **Generalized (discrete) Adjusted Winner** [Aziz2019] | EF1 + PO, always exists, O(m²). Works for mixed goods and chores. | A numeric cost per chore per partner (2m numbers); only ratios between the partners' costs drive the ordering. | High: cardinal. | Not truthful (no EF1 mechanism is, for m ≥ 5 [Li2025]). Equilibria studied only for the original divisible, goods version [AzizBranzei2015]. | One-shot. Can be re-run each period; no cumulative guarantee is proved for that. |
| **Original Adjusted Winner** [BramsTaylor1996; AzizBranzei2015] | Envy-free, equitable, PO, at most one item split. **Defined for divisible goods and strictly positive valuations**; needs one item to be split. | Cardinal point bids per item, normalised to a common total. | High: cardinal, normalised points. | Manipulable; no pure Nash equilibrium in general, but equilibria that exist are envy-free with respect to true values (goods) [AzizBranzei2015]. | One-shot. Splitting one chore could be read as time-sharing (own analysis). |
| **Round-robin picking** (each partner in turn takes their least-disliked remaining chore) [Aziz2019; Amanatidis2023] | EF1 for all-chores instances. No PO guarantee. Fails EF1 if some items are goods for someone; "double round-robin" repairs this [Aziz2019]. | A ranking of chores per partner (or just live picks). | Low: ordinal. | Not truthful. For two agents every pure Nash equilibrium of any recursively balanced picking sequence is EF1 (**goods**) [Amanatidis2026]. Robust to bounded noise (**goods**) [Dang2026]. | Naturally repeatable by alternating who picks first (own analysis); see temporal results below. |
| **Weighted picking sequence** [WuZhangZhou2023] | Weighted EF1 for chores (unequal obligations). WEF1+PO shown there only for bi-valued instances; general existence of WEF1+PO is in [Mahara2026]. | Ranking plus agreed weights. | Low to medium. | Not analysed in the sources read. | As round-robin. |
| **Divide-and-choose** | EFX for two agents with chores [HeTao2026, remark]. For goods, a cut-and-choose protocol gives each of two agents their maximin share [Amanatidis2023]. | Not specified in the sources read. Own analysis: the divider must be able to construct a split they regard as balanced; the chooser makes one bundle comparison. | Asymmetric (own analysis): high for divider, minimal for chooser. | Not truthful. | One-shot; roles can alternate (own analysis). |
| **Competitive equilibrium from equal incomes (CEEI) / competitive rule** [Bogomolnaia2017; BranzeiSandomirskiy2019] | For **divisible** chores: envy-free and PO. Not unique for chores. Rounding gives approximately fair, PO allocations of indivisible chores [BranzeiSandomirskiy2019]. | Cardinal costs; a solver. | High: cardinal, and the outcome is hard to explain. | Not truthful in general; a truthful two-agent mechanism for divisible chores has efficiency ratio 0 [Li2025]. | Divisible shares can be read as time-shares or probabilities [BranzeiSandomirskiy2019]. |
| **EQ1 + PO market algorithm; Leximin** [Freeman2020] | EQ1 + PO always exists for chores (pseudo-polynomial algorithm). EQX exists but EQX+PO may not. Leximin fails EQ1 for chores but did best empirically. | Cardinal costs **on a scale comparable across partners**. | High, plus an interpersonal-comparability assumption. | Not analysed in the source. | One-shot. |
| **PROPX algorithms** [LiLiWu2022; AzizLi2026] | PROPX and weighted PROPX always exist for chores, polynomial time. PROPX+PO exists for two agents with equal shares and positive costs; **weighted** PROPX+PO can fail for two agents and four chores. | Cardinal costs; ordinal-only gives a tight 2-approximation. | Medium to high. | Not analysed in the sources read. | One-shot. |
| **Repeated allocation of the same chore set** [Igarashi2023] | Two agents, even number of rounds: envy-free + PO overall always exists. Two rounds: additionally per-round EF1. More than two rounds: per-round "weak EF1". Dropping PO: envy-free overall + per-round EF1 in polynomial time. | Cardinal costs; the number of rounds fixed in advance. | High (cardinal), but elicited once and reused. | Not analysed in the source. | Yes, this is the model. |
| **Temporal / online allocation** [Elkind2024; Cookson2024; HuangTeh2026] | Two agents: EF1 after every round is achievable for chores when the future is known; cannot be combined with PO; EFX after every round can fail. | Cardinal costs and knowledge of future chores (informed setting). | High. | Not analysed in the sources read. | Yes. |
| **Truthful "picking-exchange" mechanisms** [Li2025; Amanatidis2017] | The only truthful two-agent mechanisms. EF1 only when m ≤ 4. | Cardinal reports. | High. | Truthful by construction. | One-shot. |
| **Artificial-currency (points) mechanisms in repeated settings** [Gorokh2021] | Converts a one-shot monetary mechanism into a repeated non-monetary one with vanishing gains from misreporting. | Repeated bids in points; type distributions (or samples). | Medium per period, ongoing. | Approximately incentive compatible in the limit of many periods. | Yes. Abstract-level evidence only; not specific to chores. |

---

## Findings by theme

### 1. Fairness notions and what exists for chores

- **Exact envy-freeness and proportionality are unattainable in general** for indivisible items; the standard illustration is one item and two agents [Mahara2026]. Proportionality "is not always satisfiable" for indivisible chores [AzizLi2026].
- **EF1 (chores definition):** any envy disappears after removing one chore from the envious agent's own bundle [HeTao2026; Mahara2026]. For additive costs an EF1 allocation of chores can be computed by round-robin [Amanatidis2023; Aziz2019]. A warning for implementers: envy-cycle elimination, the other classic EF1 algorithm for goods, may fail EF1 for chores unless cycles are resolved by "top trading" [Amanatidis2023].
- **EFX (chores):** the envy must disappear after removing *any* chore from the envious agent's bundle [HeTao2026].
  - Two agents: an EFX allocation always exists and "the simple divide-and-choose algorithm can compute it" [HeTao2026, open-problems remark in an unreviewed preprint; the same paper cites "early work" for two-agent existence]. A second, independent route: for two agents a bundle-swap reduction transfers goods results to chores, and its authors note the connection can be established "similarly" for EFX and PO, though they do not prove it [Li2025]. EFX for two agents with general valuations over goods is attributed to Plaut and Roughgarden (2020) [Tao2025; Amanatidis2023; *reported*].
  - More agents: **EFX allocations need not exist for additive chores with four or more agents**, even with three cost levels; existence for three agents is open [HeTao2026, preprint]. This is a goods/chores asymmetry: for additive goods, EFX existence is open for four or more agents and proved for three [HeTao2026; LiuSurvey2024].
  - EFX and efficiency: EFX and PO are incompatible for chores under binary supermodular costs and for binary cancelable costs, while binary additive costs admit EFX+PO [Tao2025]. For four or more agents with positive bi-valued costs, every EFX allocation can be Pareto dominated [HeTao2026]. **No source read in this session states whether EFX+PO always exists for two agents with general additive chore costs; treat as unverified.**
- **PROP1 and PROPX (chores):** EF1 implies PROP1 for additive utilities [Aziz2019]. PROP1 is compatible with PO, even for mixtures of goods and chores [Amanatidis2023]. Unlike goods, **PROPX allocations of chores always exist** and are polynomial-time computable, including with unequal shares [LiLiWu2022]. Any EFX allocation is PROPX, and any PROPX allocation gives each agent at most twice their maximin share [LiLiWu2022].
- **Two-agent simplification:** for two agents with additive utilities, proportionality implies envy-freeness (and envy-freeness always implies proportionality), so the two notions coincide [Igarashi2023, Prop. 9 and Prop. 1; Aziz2019, Prop. 1].

### 2. Fairness together with Pareto efficiency

- **Two agents:** "For two agents with additive utilities, a Pareto-optimal and EF1 allocation always exists and can be computed in O(m²) time" [Aziz2019, Theorem 2]. The algorithm is "a discrete version of the well-known Adjusted Winner rule": give all goods to a "winner" and all chores to a "loser", sort items by the ratio of the two agents' absolute utilities, then transfer items in that order until the loser does not envy the winner by more than one item [Aziz2019].
- **General case:** "When each agent has an additive cost function, an EF1 and PO allocation always exists", and likewise EF1 with fractional PO; computable in polynomial time for a constant number of agents; all results extend to weighted EF1 [Mahara2026, Theorems 1.1 to 1.4]. This was open as recently as the 2023 survey, which recorded it as unknown beyond bi-valued instances [Amanatidis2023]. The proof uses a fixed-point argument; a polynomial-time algorithm for general n remains open [Mahara2026]. Peer-reviewed venue: SODA 2026, per the reference lists of [HeTao2026; AzizLi2026].
- **PROPX + PO:** exists for two agents with equal shares and strictly positive costs [AzizLi2026, reporting Aziz, Li, Moulin, Wu and Zhu, Artificial Intelligence 331:104118, 2024; *reported*]. With **unequal** shares it fails: "Weighted PROPX and PO are incompatible even for two agents and four chores with strictly positive additive costs" (shares 3/10 and 7/10 in the counterexample), though compatible for two agents with at most three chores [AzizLi2026, Theorem 3.1 and Prop. 3.2; preprint]. PROPX is also incompatible with fractional PO even under positive costs [AzizLi2026, *reported*].
- **Equitability + PO:** an EQ1 and PO allocation of chores always exists (additive, integral valuations; pseudo-polynomial time). An EQX allocation always exists and is polynomial-time computable, but deciding whether an EQX+PO allocation exists is strongly NP-hard. "There exists an instance with normalized and strictly negative valuations in which no allocation is simultaneously EQ1, EF1 and PO" [Freeman2020, Theorem 2, Props. 3 and 4, Theorem 1]. Whether that last impossibility already bites at two agents was not checked in the source; unverified for n = 2.
- **Price of fairness:** enforcing PROPX costs a Θ(n) factor in social cost for symmetric agents and an unbounded factor for asymmetric (weighted) agents [LiLiWu2022]. For n = 2 the symmetric bound is a constant.

### 3. Adjusted Winner

- The original procedure [BramsTaylor1996] is for two parties and **divisible goods**. Each party distributes points over items; each item first goes to whoever bid more; items are then transferred (in order of bid ratio, splitting at most one item) until both parties have equal points [AzizBranzei2015].
- Under truthful reports the outcome is envy-free, equitable, Pareto optimal and splits at most one item; it is the only Pareto optimal, equitable, minimally fractional procedure [AzizBranzei2015, Theorem 1]. The procedure "is defined for strictly positive valuations" [AzizBranzei2015].
- Strategic behaviour: it "is susceptible to manipulation"; pure Nash equilibria need not exist with standard tie-breaking, ε-equilibria always do, and every pure Nash equilibrium is envy-free with respect to true valuations; with informed tie-breaking equilibria are Pareto optimal and the price of anarchy is 4/3 [AzizBranzei2015, Theorems 4 to 12]. These results are for goods and need full information about the other party's preferences [AzizBranzei2015].
- For **indivisible chores**, the relevant version is the generalized discrete AW of [Aziz2019], which replaces "equal points" with "EF1" as the stopping rule. It guarantees EF1+PO but **not** equitability.
- A deployed precedent exists: the Kajibuntan app for couples proposes a household chore division using the discrete adjusted winner algorithm; users choose from predefined chores and rate each as positive, neutral or negative [Kajibuntan2023; details come from a search-tool summary of the AAAI demo paper, the PDF itself could not be fetched, so treat the specifics as *abstract*-level].

### 4. Competitive equilibrium from equal incomes

- For divisible items the competitive rule extends from goods to chores and mixed manna and yields envy-free, Pareto optimal divisions [Bogomolnaia2017; BranzeiSandomirskiy2019].
- **Goods/chores asymmetry:** for goods the competitive division maximises the Nash product and is unique in utilities; for bads the competitive profiles are critical points of the product of disutilities on the efficiency frontier and "multiplicity is pervasive". When dividing bads "no reasonable rule ... can be ... Resource Monotonic", and the set of non-envious efficient divisions can be disconnected, so it admits no continuous selection [Bogomolnaia2017]. A worked two-agent, three-item example in that paper has between one and four competitive utility profiles.
- Computation: all competitive outcomes for chores can be computed in strongly polynomial time when the number of agents (or chores) is fixed, which covers n = 2 [BranzeiSandomirskiy2019]. In general the problem is hard: a recent preprint is titled "Competitive Equilibrium for Linear Chores is CLS-complete" [CLS2026; title and abstract snippet only].
- Indivisible chores: rounding a competitive allocation gives Pareto optimal allocations that are fair up to the removal of one chore and the addition of another (weighted versions included) [BranzeiSandomirskiy2019]; [Mahara2026] summarises this as PROP1 and fPO in polynomial time. Unequal budgets act as "virtual currency" expressing how much duty each agent owes [BranzeiSandomirskiy2019].
- Budish's approximate CEEI (Journal of Political Economy, 2011) appears in the reference lists of [HeTao2026; AzizLi2026] as the origin of EF1 and the maximin share; it was not read in this session and its guarantees are not restated here.

### 5. Picking sequences

- Round-robin yields EF1 when all items are goods and, "by a very similar argument", when all items are chores; it fails EF1 for mixed items (two agents, one good and three chores) and the double round-robin algorithm restores EF1 in O(max{m log m, mn}) time [Aziz2019, Prop. 3 and Theorem 1].
- Round-robin "only needs to know" each agent's ranking, which is why sequential picking is the standard tool when only ordinal information is available [Amanatidis2023].
- Unequal obligations: a weighted picking sequence computes a weighted EF1 allocation of chores [WuZhangZhou2023].
- No efficiency guarantee: none of the sources claims PO for round-robin, and the EF1+PO results above all require cardinal information.

### 6. Repeated, temporal and online allocation

- **Same chores every round** [Igarashi2023] (motivated explicitly by "recurring chores to distribute in a household"):
  - For every n ≥ 2 and a number of rounds k that is a multiple of n, a sequence that is proportional and PO overall always exists; if k is not a multiple of n, overall proportionality can fail even for all-chores instances (Theorem 7, Prop. 5).
  - n = 2 and k even: a sequence that is **envy-free and PO overall** always exists (Theorem 10), computable in O(m·(k+1)^m) time, which is exponential in the number of chores.
  - k = n = 2: PO + envy-free overall + **per-round EF1** always exists (Corollary 14).
  - n = 2, k > 2: per-round EF1 + PO overall + envy-free overall may not exist, even for all-chores instances (Prop. 12); it does exist with per-round "weak EF1" (Corollary 16).
  - n = 2, k even, without PO: envy-free overall and per-round EF1 always exists and is polynomial-time computable (Theorem 19).
  - If the number of rounds can be chosen freely (rational utilities), envy-free + PO overall with per-round PROP1 exists for any n (Theorem 20).
  - More than two agents: for all n > 2 and all k there are instances with only two chores with no envy-free and PO sequence (Theorem 6).
- **Different items each round, future known:** for two agents an allocation that is EF1 after every round (TEF1) exists and is polynomial-time computable, for goods and for chores; adding PO breaks existence and makes the decision problem NP-hard; EFX after every round can fail even for two identical agents [Elkind2024]. "Achieving both EF1 and PO up to each day is impossible, even with just two agents" [Cookson2024, reporting the same line of work]. For two agents (goods) one can guarantee stochastic-dominance EF1 per day together with EF1 up to each day [Cookson2024]; a later preprint summarises these as ordinal guarantees for n = 2 [AdamsSegalHalevi2026].
- **Online, future unknown:** with a limited form of reassignment, an adaptation of round-robin maintains EF1 and a (2 − 1/n)-approximation of the maximin share for chores, and no deterministic algorithm without predictions does better; any finite EFX approximation essentially requires knowing the exact number of chores [HuangTeh2026, preprint]. For n = 2 the factor is 3/2.
- **One chore per person per day:** a recent preprint studies sequences of assignments that stay ordinally PROP1 after every day [AdamsSegalHalevi2026]; its positive results are stated for small n and it is flagged here only as a pointer.
- **Points over time:** artificial-currency mechanisms turn a one-shot monetary mechanism into a repeated non-monetary one in which the gain from misreporting vanishes over time; for two agents a specific artificial-currency mechanism has vanishing price of anarchy [Gorokh2021; *abstract*-level, not chore-specific].

### 7. Preference elicitation burden

Three input types appear in the literature, in increasing burden:

1. **Ordinal ranking of single chores.** Sufficient for EF1 via round-robin [Amanatidis2023]. Not sufficient for exact PROPX: an ordinal algorithm achieves 2-approximate PROPX (also weighted) and "with only ordinal preferences, no algorithm can guarantee a better-than-2 approximation" [LiLiWu2022, Theorem 5.1 and Lemma 5.1].
2. **Comparisons between bundles** ("which of these two workloads is lighter?"). For chores, any comparison-based algorithm needs Ω(log(m/n)) queries for EF1, PROP1 or approximate MMS; PROP1 is achievable with O(n³ log m) comparisons; EF1 with O(log m) comparisons is shown for three agents [LinLiu2026, preprint]. The source does not state a two-agent EF1 upper bound, so none is claimed here. Comparison queries cannot even *test* whether a bundle is proportional, because proportional share is a cardinal quantity [LinLiu2026, Appendix A].
3. **Cardinal costs per chore.** Required by every EF1+PO, EQ1+PO, PROPX and competitive-equilibrium method above. With value queries on goods, two agents need Θ(log m) queries for EF1 but Θ(m) for EFX or exact envy-freeness, even with identical additive utilities [Oh2018; goods only].

Caveats:

- The logarithmic bounds are asymptotic in m. For a household with a few dozen chores the gap between log m and m is small in absolute terms (own analysis).
- **Format matters in practice.** Spliddit's task-division tool did not ask for costs directly; it asked for multipliers, that is, how many times a user would do chore A instead of doing chore B once [Freeman2020, describing Spliddit; Spliddit2014].
- **Noisy reports.** With goods, if every reported value is within ε of the truth, round-robin on the reports keeps true envy at most 2ε⌈m/n⌉ + b, where b is the upper bound on any single item's value, and no deterministic algorithm can guarantee better than 2ε·m/n [Dang2026, Theorems 5 and 6; preprint, **goods only**]. The same paper shows values can be estimated from noisy pairwise comparisons (Bradley-Terry-Luce model) and fed to round-robin. Its introduction calls cardinal elicitation "cognitively burdensome and prone to inaccuracies", but that is a motivating statement, not a measured result.
- **No source found in this session measures elicitation burden on real couples.** A human-subject study of perceived fairness of threshold-based versus comparison-based notions exists [Hosseini2025; *abstract* only], and experiments on real Spliddit data are reported in [Freeman2020], but neither measures burden.

### 8. Manipulation

- **Impossibility.** For two agents and indivisible goods, truthful mechanisms are exactly the "picking-exchange" mechanisms, which implies "there is no truthful mechanism with bounded fairness guarantees under any meaningful fairness notion" [Amanatidis2023 describing Amanatidis2017]. The characterisation transfers to chores by a bundle-swap reduction: "for m ≤ 4, there exists a truthful and EF1 mechanism for chores. Moreover, for m ≥ 5, there is no truthful and EF1 mechanism for chores" (indivisible, n = 2) [Li2025, Corollary 3.3].
- **Escape routes named in the literature:** restricted (binary or bi-valued) valuations, randomisation, or money [Li2025]. For bi-valued costs (each chore is "easy" or "hard" for each person, with the same two cost levels) there is a randomised mechanism that is truthful in expectation, ex-ante PO and envy-free, and ex-post EF1 for chores [Li2025, Theorem 5.1].
- **Divisible chores:** every truthful two-agent mechanism (under mild conditions) has efficiency ratio 0 [Li2025, Theorem 4.7].
- **Equilibrium behaviour of simple mechanisms (goods only).** A 2026 preprint shows that not every pure Nash equilibrium of round-robin is EF1 (three agents, eight goods), correcting an earlier published claim; but every equilibrium of any recursively balanced picking sequence is 1/2-EF1 and PROP1, and "for two agents ... every pure Nash equilibrium ... induces an EF1 allocation" [Amanatidis2026, Prop. 1, Theorem 1, Corollary 1]. An EF1 equilibrium always exists (the "bluff profile" reproduces the truthful allocation) [Amanatidis2026].
- **Adjusted Winner:** see theme 3; equilibria remain envy-free with respect to true values, for the divisible goods version [AzizBranzei2015].
- **Relevance of "cooperative but noisy" partners (own analysis).** The impossibility results concern deliberate misreporting. For the project's stated setting (cooperative partners who may misreport unintentionally), the noise-robustness result in theme 7 is the closer match, and it is currently available only for goods and only for round-robin.

---

## Implications for the allocation method

Everything in this section is own analysis built on the cited results. No paper found in this session analyses the prototype's mechanism (bid points, assign to the highest bidder, rebalance until weighted burden is within 15%).

1. **Name the axiom the prototype targets.** "Weighted burden within a tolerance" is an equitability criterion (each partner's own-assessed load is about equal, after weights). The literature's main line for two agents targets envy-freeness (neither partner would rather have the other's list). These are different promises and can conflict once efficiency is also demanded [Freeman2020, Prop. 4]. Equitability also needs the two partners' point scales to be comparable; envy-freeness and proportionality do not, because each partner is only compared with themselves. Normalising each partner's points to a fixed total, as Adjusted Winner does [AzizBranzei2015], is the usual way to impose comparability, and it is an assumption, not a fact about the couple.
2. **The prototype has the same skeleton as Adjusted Winner.** Phase 1 of AW also gives each item to the higher bidder, and phase 2 also rebalances. Two differences matter. (a) For chores the efficient first step is to give each chore to the partner who *minds it less*; whether "highest bidder" means that depends on what a bid expresses in the prototype, and should be checked. (b) AW's rebalancing transfers items in order of the ratio of the two partners' valuations, which is what preserves Pareto optimality [AzizBranzei2015, Lemma 1; Aziz2019]. A rebalancing step that moves chores in any other order has no efficiency guarantee.
3. **Replace the 15% tolerance with an "up to one chore" stopping rule, or justify it.** With indivisible chores a fixed percentage band can be infeasible (for example, one very heavy chore), whereas EF1, PROPX and EQ1 are always achievable [Aziz2019; LiLiWu2022; Freeman2020]. A percentage band may be a reasonable user-facing explanation, but the guarantee underneath should be one of the "up to one chore" notions.
4. **Principled alternatives, in order of elicitation cost.**
   - *Rankings only:* round-robin with alternating first pick. Guarantee: EF1. No efficiency guarantee. Best available robustness to noise and to strategic play.
   - *Points per chore (what the prototype already collects):* generalized Adjusted Winner. Guarantee: EF1 + PO. If the couple wants an unequal split, weighted EF1 + PO exists [Mahara2026], but note that for n = 2 the O(m²) algorithm of [Aziz2019] is stated for equal entitlements; the weighted two-agent algorithm would follow [Mahara2026, Theorem 1.4(3)] (polynomial for constant n).
   - *Points per chore, equitability preferred:* EQ1 + PO [Freeman2020], accepting the comparability assumption.
5. **Use recurrence to close the gap.** Because household chores repeat, the project can aim for exact envy-freeness plus PO over an even number of periods for two agents [Igarashi2023, Theorem 10], with every single period EF1 when planning two periods at a time (Corollary 14). The exact algorithm is exponential in the number of chores, so a heuristic or an integer program would be needed at realistic sizes; the paper gives an ILP for the related proportional + PO problem.
6. **Do not expect to maintain efficiency and fairness after every period simultaneously.** EF1 after every round plus PO is impossible in general even for two agents [Elkind2024; Cookson2024]. Choose between "fair at every checkpoint" and "efficient overall".
7. **Unequal splits change which guarantees survive.** Weighted EF1 + PO survives [Mahara2026]; weighted PROPX + PO does not, already for two agents and four chores [AzizLi2026]. Since the project's objective is the couple's own split, EF1-type guarantees are the safer foundation.
8. **Do not promise strategy-proofness.** With five or more chores it is incompatible with EF1 for two agents [Li2025]. A transparent procedure whose equilibria are still fair (round-robin for two agents [Amanatidis2026]) or whose equilibria remain envy-free (Adjusted Winner, goods version [AzizBranzei2015]) is the realistic target.
9. **Coarse inputs are not obviously worse.** Bi-valued ("easy/hard") costs are the one setting where truthfulness, efficiency and fairness are simultaneously achievable (in expectation) for chores [Li2025], and binary or bi-valued instances also admit the strongest EFX + PO results [Tao2025; HeTao2026]. A three-level rating, as in Kajibuntan [Kajibuntan2023], sits close to this regime.

---

## Open questions and gaps

**Open in the literature**

- Existence of EFX for three agents with additive chores [HeTao2026]. Not binding for this project (n = 2).
- A polynomial-time algorithm for EF1 + PO for general n, goods or chores [Mahara2026]. Not binding for n = 2.
- PROPX + PO for equal shares, positive costs, n ≥ 3 and m > n [AzizLi2026].
- Equilibrium guarantees of round-robin between 1/2-EF1 and 2/3-EF1 for n ≥ 3 [Amanatidis2026].
- How many rounds are needed for envy-free + PO repeated allocations when the horizon can be chosen [AdamsSegalHalevi2026 describing Igarashi2023].

**Gaps found in this search (things the project needs that no retrieved source supplies)**

- **Goods-only results that the project would rely on for chores:** noise robustness of round-robin [Dang2026]; fairness of round-robin equilibria [Amanatidis2026]; equilibria of Adjusted Winner [AzizBranzei2015]; value-query complexity [Oh2018]; SD-EF1 per day with EF1 up to each day [Cookson2024]. For two agents the bundle-swap reduction of [Li2025] suggests many of these transfer, but only truthfulness, EF1 and MMS are proved to transfer there.
- **EFX + PO for two agents with general additive chore costs:** not confirmed by any source read.
- **Whether EQ1 + EF1 + PO is always achievable for two agents** (the impossibility in [Freeman2020] was not checked for n = 2).
- **Additivity.** Every guarantee above assumes additive costs. Household chores plausibly have complementarities (batching errands) and fatigue (convex cost of total load). EFX and PO are already incompatible under binary supermodular costs [Tao2025, *reported*]. No source on two-agent chore division with non-additive costs was read.
- **Cognitive labour.** No retrieved fair-division paper models planning, anticipating or monitoring work as distinct from executable tasks. Treating cognitive labour as additional "chores" is a modelling choice the project must make and defend from other evidence.
- **Changing preferences and chore sets.** The repeated model assumes the same items and fixed utilities in every round [Igarashi2023]; the temporal model assumes the future is known [Elkind2024].
- **Empirical elicitation burden and perceived fairness for couples.** No measurement found. One human-subject study on perceived fairness of fairness notions was located but only its abstract was read [Hosseini2025].
- **Mechanisms with points over time for chores specifically.** Only general, abstract-level evidence [Gorokh2021].
- **Search limitations.** The Consensus search tool was unavailable (quota exhausted), so coverage rests on arXiv (alphaXiv) and web search. Economics and psychology journals not mirrored on arXiv are under-represented. The Brams and Taylor primary sources were not read directly.

---

## References

Status key: **read** = full text retrieved in this session and the cited statements located; **abstract** = abstract or listing only; **reported** = cited through another source. "Preprint" means no peer-reviewed venue was confirmed by a tool result.

- **[AdamsSegalHalevi2026]** Adams, T., Segal-Halevi, E. "Perpetually Fair Assignments Via Balanced Sequences of Permutations." arXiv:2602.21687 (2026). Preprint. Read (related-work section and abstract).
- **[Amanatidis2017]** Amanatidis, G., Birmpas, G., Christodoulou, G., Markakis, E. "Truthful Allocation Mechanisms Without Payments: Characterization and Implications on Fairness." ACM EC 2017. arXiv:1705.10706; DOI 10.1145/3033274.3085147. Abstract; main results reported via [Li2025] and [Amanatidis2023].
- **[Amanatidis2023]** Amanatidis, G., Aziz, H., Birmpas, G., Filos-Ratsikas, A., Li, B., Moulin, H., Voudouris, A. A., Wu, X. "Fair Division of Indivisible Goods: Recent Progress and Open Questions." Artificial Intelligence 322:103965 (2023). DOI 10.1016/j.artint.2023.103965; arXiv:2208.08782. Survey. Read (chores, strategic and limited-information sections).
- **[Amanatidis2026]** Amanatidis, G., Aziz, H., Birmpas, G., Fusco, F., Leonardi, S., Reiffenhäuser, R. "Revisiting the Fairness of Pure Nash Equilibria of Round-Robin." arXiv:2610.23686 (2026). Preprint. Goods only. Read.
- **[Aziz2019]** Aziz, H., Caragiannis, I., Igarashi, A., Walsh, T. "Fair allocation of indivisible goods and chores." arXiv:1807.10684 (v4, 2021). Cited as a 2022 journal article by [LiuSurvey2024]; journal details not verified in this session. Read.
- **[AzizBranzei2015]** Aziz, H., Brânzei, S., Filos-Ratsikas, A., Frederiksen, S. K. S. "The Adjusted Winner Procedure: Characterizations and Equilibria." arXiv:1503.06665 (v4, 2017). Venue not verified. Divisible goods. Read.
- **[AzizLi2026]** Aziz, H., Li, B. "On the Incompatibility of Weighted PROPX and Pareto Optimality for Indivisible Chores." arXiv:2608.16130 (2026). Preprint. The authors disclose that the central counterexamples were found with an AI system and verified by them. Read.
- **[Bogomolnaia2017]** Bogomolnaia, A., Moulin, H., Sandomirskiy, F., Yanovskaya, E. "Competitive division of a mixed manna." arXiv:1702.00616 (2017). Venue not verified. Divisible items. Read (abstract, introduction, two-agent example).
- **[BramsTaylor1996]** Brams, S. J., Taylor, A. D. "Fair Division: From Cake-Cutting to Dispute Resolution." Cambridge University Press, 1996. ISBN 0-521-55644-9. No DOI was verified. Listing: https://en.wikipedia.org/wiki/Adjusted_winner_procedure . Reported via [AzizBranzei2015].
- **[BranzeiSandomirskiy2019]** Brânzei, S., Sandomirskiy, F. "Algorithms for Competitive Division of Chores." arXiv:1907.01766 (2019). Venue not verified. Read (abstract, introduction).
- **[CLS2026]** "Competitive Equilibrium for Linear Chores is CLS-complete." arXiv:2611.06589 (2026). Preprint. Title and abstract snippet only; authors not captured.
- **[Cookson2024]** Cookson, B., Ebadian, S., Shah, N. "Temporal Fair Division." arXiv:2410.23416 (2024). Preprint. Goods. Read (abstract, introduction, related work).
- **[Dang2026]** Dang, T., Halpern, D., Makur, A., Psomas, A., Singh, J., Verma, P. "Fair Division Under Inaccurate Preferences." arXiv:2602.24169 (2026). Preprint. Goods only. Read.
- **[Elkind2024]** Elkind, E., Lam, A., Latifian, M., Neoh, T. Y., Teh, N. "Temporal Fair Division of Indivisible Items." arXiv:2410.14593 (2024). Preprint status not verified. Goods and chores. Read (abstract, introduction, Prop. 3.5).
- **[Freeman2020]** Freeman, R., Sikdar, S., Vaish, R., Xia, L. "Equitable Allocations of Indivisible Chores." arXiv:2002.11504 (2020). Venue not verified. Read.
- **[Gorokh2021]** Gorokh, A., Banerjee, S., Iyer, K. "From Monetary to Nonmonetary Mechanism Design via Artificial Currencies." Mathematics of Operations Research 46(3):835-855 (2021). DOI 10.1287/moor.2020.1098. Abstract.
- **[HeTao2026]** He, W., Tao, B. "EFX for Additive Chores: Nonexistence, Pareto Incompatibility, and Bi-Valued Existence." arXiv:2606.08872 (v2, 2026). Preprint. Read.
- **[Hosseini2025]** Hosseini, H., Kavner, J., Khanna, S., Sikdar, S., Xia, L. "Bridging Theory and Perception in Fair Division: A Study on Comparative and Fair Share Notions." arXiv:2505.10433 (2025). Preprint. Abstract.
- **[HuangTeh2026]** Huang, Y., Teh, N. "Online Fair Division of Chores with Upgrade Recourse." arXiv:2611.00432 (2026). Preprint. Read (abstract, introduction).
- **[Igarashi2023]** Igarashi, A., Lackner, M., Nardi, O., Novaro, A. "Repeated Fair Allocation of Indivisible Items." arXiv:2304.01644 (v2, 2023). Venue not verified. Goods, chores and mixed. Read.
- **[Kajibuntan2023]** Igarashi, A., Yokoyama, T. "Kajibuntan: A House Chore Division App." AAAI 2023 (demonstration), vol. 37, pp. 16449-16451. DOI 10.1609/aaai.v37i13.27075; https://ojs.aaai.org/index.php/AAAI/article/view/27075 . Abstract (via search and index-page summaries; PDF not retrievable).
- **[Li2025]** Li, B., Tao, B., Wang, F., Wu, X., Yang, M., Zhou, S. "When is Truthfully Allocating Chores no Harder than Goods?" arXiv:2505.01629 (2025). Listed as International Symposium on Algorithmic Game Theory 2025, pp. 247-264, in the reference list of [HeTao2026]. Read.
- **[LiLiWu2022]** Li, B., Li, Y., Wu, X. "Almost (Weighted) Proportional Allocations for Indivisible Chores." ACM Web Conference 2022, pp. 122-131 (venue per reference lists of [HeTao2026; AzizLi2026]). arXiv:2103.11849. Read.
- **[LinLiu2026]** Lin, Z., Liu, S., Tao, B., Zhou, S. "Comparison-Based Fair Division of Indivisible Chores." arXiv:2609.08687 (2026). Preprint. Read.
- **[LiuSurvey2024]** Liu, S., Lu, X., Suzuki, M., Walsh, T. "Mixed Fair Division: A Survey." Journal of Artificial Intelligence Research 80:1373-1406 (2024). DOI 10.1613/jair.1.15800; arXiv:2306.09564. Survey. Read (indivisible goods-and-chores sections).
- **[Mahara2026]** Mahara, R. "Existence of Fair and Efficient Allocation of Indivisible Chores." ACM-SIAM SODA 2026, pp. 6742-6766 (venue per reference lists of [HeTao2026; AzizLi2026]). arXiv:2507.09544. Read.
- **[Oh2018]** Oh, H., Procaccia, A. D., Suksompong, W. "Fairly Allocating Many Goods with Few Queries." arXiv:1807.11367 (v2, 2021). Venue not verified. Goods only. Read (abstract, results table).
- **[Spliddit2014]** Goldman, J., Procaccia, A. D. "Spliddit: Unleashing Fair Division Algorithms." ACM SIGecom Exchanges 13(2):41-46 (2014). DOI 10.1145/2728732.2728738. Abstract; task-division details reported via [Freeman2020].
- **[Tao2025]** Tao, B., Wu, X., Yu, Z., Zhou, S. "On the Existence of EFX (and Pareto-Optimal) Allocations for Binary Chores." Theoretical Computer Science 1042:115248 (2025) (venue per reference list of [HeTao2026]). arXiv:2308.12177. Read (abstract, introduction).
- **[WuZhangZhou2023]** Wu, X., Zhang, C., Zhou, S. "Weighted EF1 Allocations for Indivisible Chores." ACM EC 2023, p. 1155 (venue per reference list of [AzizLi2026]). arXiv:2301.08090. Read (abstract).

Additional pointers that were surfaced but not relied on: Guo, H., Li, W., Deng, B. "A Survey on Fair Allocation of Chores." Mathematics 11(16):3616 (2023), DOI 10.3390/math11163616 (peer-reviewed survey, not read); Aziz, H., Li, B., Moulin, H., Wu, X., Zhu, X. "Almost proportional allocations of indivisible chores: Computation, approximation and efficiency." Artificial Intelligence 331:104118 (2024) (reported via [AzizLi2026]; no DOI verified).
