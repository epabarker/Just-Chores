# What the studies of algorithmic chore division show

Research ticket: issue #14. Researched 2026-11-16.

## Short answer

Neither precedent gives study-grade evidence on how two cohabiting partners perceive an algorithmic split of their chores.

- **Lee and Baykal (2017)** did divide household chores with a fair-division algorithm and did measure perceived fairness. But the participants were campus-recruited groups of two to five, described by the authors as "a group of strangers", doing a one-off laboratory task. No couples were studied and two-person groups were not analysed separately.
- **Kajibuntan (Igarashi and Yokoyama, 2023)** is an algorithmic chore-division app built for couples. Its full text could not be obtained in this session. The only perception evidence found is a single figure in a university press feature (about 120 users surveyed, around 60% positive), with no instrument, sampling or fairness measure described.
- **Lee et al. (2019)** divided food items, not chores, among groups of two to seven. It is off-target on both the object divided and the relationship.

So the question "do partners perceive an algorithmically computed chore split as fair?" is still open as far as these three sources go.

## What was read, and at what level

| Source | Level of text read in this session |
|---|---|
| Lee and Baykal (2017), doi:10.1145/2998181.2998230 | Full body text, pages 1 to 12, from the first author's hosted PDF [L17]. Figures and the reference list were not read. |
| Lee et al. (2019), doi:10.1145/3359284 | Partial full text from the first author's hosted PDF [L19]: pages 1-2, 8-13, 16 and 21 of 26. The Appendix A ratings table and the rest of sections 6-7 were not read. |
| Igarashi and Yokoyama (2023), doi:10.1609/aaai.v37i13.27075 | **Full text not read.** Read: bibliographic records and paraphrased abstracts [K-MLA], [K-PC], [K-S2]; two institutional secondary descriptions [UT], [JST]; mentions in three citing papers [E24], [I23], [L24]; the live app pages [APP-JP], [APP-EN]; and web-search result summaries attributed to the PDF (unverified, see section 1.3). |

Routes to the Kajibuntan full text that failed: the AAAI OJS article page and PDF link (both returned an Anubis bot-protection page to every fetch tool), the Semantic Scholar web page (JavaScript check), the ACM Digital Library mirror (HTTP 403), an archive.org copy (fetch not permitted), a direct download (not permitted in this environment), and a title lookup in the alphaXiv index (not indexed; no arXiv version was found). The first author's publications page lists the paper with no PDF link [IG-PUB].

---

## 1. Kajibuntan (Igarashi and Yokoyama, 2023)

Igarashi, A. and Yokoyama, T. (2023). Kajibuntan: A House Chore Division App. Proceedings of the 37th AAAI Conference on Artificial Intelligence, 16449-16451, demonstration track. doi:10.1609/aaai.v37i13.27075. Bibliographic details from [K-MLA], [K-PC] and the reference lists of [E24], [I23], [L24].

### 1.1 Abstract and bibliographic level

These claims rest on paraphrases of the abstract returned by [K-MLA], [K-PC] and [K-S2]; the abstract was not seen verbatim.

- **What is divided:** household chores between the two members of a couple.
- **Inputs:** the set of chores to be shared, each partner's preferences over those chores, and the current allocation.
- **Output:** a visualisation of the current allocation, and proposed new allocations based on the stated preferences and "the theory of fair division".
- **Stated aim:** a systematic and transparent way to divide chores, to help harmony in the home.
- **Evaluation:** no user study or evaluation is mentioned at abstract level. Whether the three-page paper reports one is unverified.

### 1.2 Institutional secondary descriptions

From a University of Tokyo feature article [UT] and a Japan Science and Technology Agency (JST) research-results page [JST]. These are not the paper.

- **Who built it:** Igarashi with the nonprofit Code for Japan, in 2022 [UT], within a JST co-creation programme lasting about three months [JST].
- **Inputs:** users select chores from an on-screen list; for each chore they enter how many times a week it is done and how long it takes, and rate it "like", "neutral" or "dislike" [UT]. JST describes the inputs as each person's "time taken" and "likes/dislikes" [JST].
- **Fairness criterion:** envy-freeness. JST: "a situation in which no envy occurs in the distribution to others was defined as fairness" [JST]. The feature quotes Igarashi: "Envy-free division means, under each individual's own evaluation, they feel they've received the best possible share" [UT].
- **Algorithm:** not specified in either source beyond a mathematical model that allocates by each person's strengths and preferences [UT], [JST].
- **Output:** pie charts of each person's current burden, then a proposed more balanced split with weekly assignments [UT], [JST].
- **Reach:** roughly 13,000 unique visitors a month after television coverage [UT].
- **Perception evidence:** "A survey of about 120 users found positive feedback from around 60%"; some users found the input process too complicated or the chore categories too detailed [UT]. This is the only perception figure found. It is press-reported, concerns the app in general rather than the perceived fairness of the proposed split, and comes with no description of the instrument, the sampling, or whether respondents were both members of a couple. The JST page gives no user data [JST].

### 1.3 Unverified search snippets attributed to the PDF

A web search engine returned summaries that it attributed to the AAAI PDF (https://ojs.aaai.org/index.php/AAAI/article/download/27075/26847), which could not be opened directly. These are **unverified** and the summaries were not fully consistent with each other. They should not be cited as the paper's content until the PDF is read.

- The problem is framed as fair division of indivisible chores between two agents, each with a disutility function over the chores.
- Because envy-free allocations of indivisible chores need not exist, the paper turns to envy-freeness up to one item (EF1) and defines Pareto optimality.
- A procedure that transfers chores between the envied and the envious partner and stops before a transfer would create envy in the other direction.
- The app offers 52 predefined daily chores.
- A reference to the generalised adjusted winner protocol for two agents; one summary could not confirm how the paper uses it.

### 1.4 What citing papers say

- Igarashi et al. (2023), arXiv:2304.01644, state that the app "to help couples divide household chores fairly" was developed "based on some of these results", referring to Aziz, Caragiannis, Igarashi and Walsh (2022) on fair allocation of indivisible goods and chores [I23]. This supports, but does not by itself establish, the EF1 reading in section 1.3.
- Elkind, Igarashi and Teh (2024), arXiv:2410.23979, describe it as "an application that helps couples to fairly divide household chores" and note that it "does not allow the household members to specify budget constraints, and this reduces the usability of the tool" [E24]. The app therefore takes no time-availability input, according to a co-author.
- Liu et al. (2024), arXiv:2306.09564, list it among fair-division methods made publicly available, as a demo-track paper [L24].

### 1.5 The live app

- https://kajibuntan.com returned only a logo and a "try it" button leading to an input page [APP-JP].
- https://housechore-division.com is linked from the first author's site as her house-chore division app for couples [IG]. The page does not name itself Kajibuntan, so it is treated here as the apparent English version. Its four steps are "Choose Your House Chores", "Your Input", "Partner's Input" and "Proposal", with chores grouped into living room, kitchen, bathroom, household, bedroom, outdoor, kids and baby [APP-EN]. This is first-party evidence of the two-partner, separate-input design. The page states no fairness notion or algorithm.

### 1.6 Summary for Kajibuntan

| Item | Finding | Evidence level |
|---|---|---|
| What was divided | Household chores between two partners | Abstract paraphrase; app pages |
| Inputs | Chore set, per-partner preferences, current allocation; per chore: weekly frequency, time taken, like/neutral/dislike | Abstract paraphrase; [UT], [JST] |
| Fairness criterion | Envy-freeness (EF1 relaxation plus Pareto optimality unverified) | [UT], [JST]; snippets unverified |
| Algorithm | Not verified; said to build on Aziz et al. (2022) | [I23]; snippets unverified |
| Sample and design | No study design found; a user survey of about 120 is press-reported | [UT] |
| Perception evidence | Around 60% positive feedback on the app; usability complaints | [UT] only |

---

## 2. Lee and Baykal (2017)

Lee, M. K. and Baykal, S. (2017). Algorithmic Mediation in Group Decisions: Fairness Perceptions of Algorithmically Mediated vs. Discussion-Based Social Division. Proceedings of CSCW '17, 1035-1048. doi:10.1145/2998181.2998230. All claims in this section are from the first author's hosted PDF [L17]; page numbers refer to that PDF. The proceedings page range is from a search result, not from the PDF.

**Were household chores among the tasks divided? Yes, in both studies** (pp. 1, 4, 8). This settles the point the ticket flagged as unverified.

### 2.1 Tool, inputs and fairness criteria

Both studies used Spliddit, a public website applying fair-division algorithms (p. 2-3). Individual inputs were not shown to other group members (p. 3).

- **Task (chore) division:** users compare each task against a randomly chosen baseline task, pick which they prefer, and enter a multiplier for how many times they would do the chosen task instead of the other. The algorithm "guarantees equity, with each user believing their workload is identical", plus efficiency in the Pareto sense (p. 3). The chore criterion is therefore equitability, not envy-freeness.
- **Rent:** slider inputs of the maximum each person would pay per room; envy-free and efficient (p. 3).
- **Goods:** sliders summing to 1000; equitable, envy-free and efficient for two people; envy-free with a maximin-share guarantee for three or more (p. 3).
- **Credit:** each person rates the others' contributions, summing to 100%; impartiality and consensus (p. 3-4).

### 2.2 Study 1: qualitative laboratory study

- **Design:** groups of two to five did one division task per session using Spliddit, then a survey and an individual 10-15 minute interview. About half the sessions had a short discussion of preferences before entering inputs (p. 2, 4-5).
- **What was divided:** rent and house chores in a hypothetical shared apartment; snacks and credit for a game outcome as real laboratory tasks (p. 4). The chore condition was cooking seven times a week, dishwashing seven times a week, emptying the trash once and dusting once (p. 4).
- **Sample:** 55 participants in 20 sessions after exclusions (63 in 23 run), mean age 28.7, 55% female, recruited at Carnegie Mellon University in November-December 2015. The chore condition had 5 sessions, N=11; rent 5 sessions, N=12; goods 8 sessions, N=24; credit 2 sessions, N=8. Only a few participants knew each other (p. 4-5).
- **Measure:** 7-point agreement with "My task assignment is fair", the same for each other member, and "The overall result for the group was fair" (p. 5).
- **Result:** mean fairness of own outcome 5.04 (SE .23) and of group outcome 4.95 (SE .2). 30% rated their own outcome 4 or less, and 36% rated the group outcome 4 or less (p. 5). These figures are pooled over all four division types and are not chore-specific.
- **Why outcomes were judged unfair** (p. 5-7; the authors caution that the percentages are from a small qualitative sample):
  - *Multiple concepts of fairness.* About a third rated their outcome as fair when it mirrored their input. For a majority, an even distribution of the objective quantity (money, number of tasks) was essential to fairness even when preferences were satisfied. The printed figure is "65.55% of all participants from 25 sessions", which is inconsistent with the 20 sessions analysed; quoted as printed.
  - *Altruism and social norms.* Some wanted to compromise for others, accommodate stronger preferences, or know others' reasons; the tool gave no way to do so.
  - *Error-prone quantification.* Participants used anchoring heuristics; some entered extreme multipliers (cook 10 times rather than dust once) that skewed group outcomes; some strategised their input. The single random baseline task in the chore interface was itself seen as biasing.
  - *No social transparency.* Not seeing others' preferences or satisfaction lowered perceived fairness of the group outcome.
- **Views in favour of the algorithm:** 9 participants called it fairer because it is objective; 14 saw it as a mediator for uncomfortable conversations (p. 7).

### 2.3 Study 2: between-subjects experiment on chores

- **Design:** groups divided chores either with Spliddit (individual private inputs) or by a group discussion capped at ten minutes, then actually performed their assigned chores in a kitchen laboratory (p. 7-8).
- **What was divided:** for groups of two to three, five tasks: washing 11 dishes, making tea and coffee twice, mopping the floor, sorting trash, and sorting 80 scattered papers. Groups of four to five had three more: making lemonade, sorting candies, filling ice-cube trays. Tasks were picked from a pilot ranking so that some were clearly less desirable (p. 8).
- **Sample:** 103 participants in 33 sessions; 50 participants in 16 sessions with the algorithm and 53 in 17 sessions with discussion; mean age 24.06, 57% female; Carnegie Mellon University, March-April 2016. Each condition had 10 small groups (2-3 people), with 6 and 7 large groups (4-5 people) respectively (p. 8).
- **Measures:** the Study 1 fairness items, taken after assignment and again after doing the chores; a two-item interpersonal power scale; self-rated programming knowledge. Fairness ratings did not differ between the two time points (p. 9).
- **Results (p. 9-10):**
  - Own outcome rated fairer under discussion (M=6, SE .2) than under the algorithm (M=4.76, SE .2), F(1,31.5)=18.6, p<.001.
  - Group outcome rated fairer under discussion (M=6, SE .22) than under the algorithm; the paper prints "M=4 (SE=4.31)", an apparent typographical error, with F(1,31.48)=29.6, p<.0001.
  - Interpersonal power moderated the group-outcome effect (F(1,91.82)=3.91, p=.05): people high in interpersonal power saw discussion as noticeably fairer; people low in it rated the two similarly. No such interaction for own outcome.
  - The programming-knowledge hypothesis was not supported; a marginal effect ran the other way (F(1,95.5)=3.42, p=.07), with more programming knowledge going with lower rated fairness of the algorithmic outcome.
- **Why discussion felt fairer** (interviews, p. 10-11): people who chose or agreed to their chores held themselves responsible for the result; discussion revealed others' preferences and allowed compromise; groups set their own rule, most often an even split of time and matching chores to skill.

### 2.4 Limits stated by the authors

"We used a limited set of tasks in a group of strangers with a few types of fair division algorithms in our laboratory study"; they call for other social contexts and a longitudinal field study (p. 11).

---

## 3. Lee et al. (2019)

Lee, M. K., Jain, A., Cha, H. J., Ojha, S. and Kusbit, D. (2019). Procedural Justice in Algorithmic Fairness: Leveraging Transparency and Outcome Control for Fair Algorithmic Mediation. Proc. ACM Hum.-Comput. Interact. 3, CSCW, Article 182, 26 pages. doi:10.1145/3359284. All claims are from the pages read of the first author's hosted PDF [L19].

- **What was divided:** food items that participants kept (drinks, crisps, chocolate bars priced $1 to $5). **No chores.** The paper mentions household-task tools only as background (p. 2, 11).
- **Inputs:** Spliddit's goods interface, entered individually with no prior discussion (p. 10-11).
- **Fairness criterion and algorithm:** Spliddit's goods algorithm. For two people: equitability, envy-freeness and efficiency. For three or more: envy-freeness with a maximin-share guarantee (p. 8).
- **Intervention:** an added interface giving (a) standards clarity, a step-by-step account of the fairness properties, (b) outcome explanation, a matrix of everyone's inputs and the resulting allocation, and (c) outcome control, letting individuals and then the group adjust the allocation (p. 8-10).
- **Sample and design:** 71 participants in 23 groups of two to seven, campus-recruited; within-subjects, with the same fairness survey after the baseline result, after transparency, and after outcome control, followed by individual interviews (p. 10-12).
- **Baseline perception:** own outcome M=5.38 (SD 1.75), group outcome M=4.79 (SD 1.62) on the 7-point scale. 27 of 71 rated their own outcome "somewhat fair" or lower, and 43 of 71 did so for the group outcome (p. 13).
- **Effects** (abstract and p. 13-16; per-phase ratings in Appendix A were not read, so only directions are given):
  - Standards clarity alone did not raise perceived fairness.
  - Outcome explanation had mixed effects. It raised fairness when it showed equal utility across people; it lowered fairness when it exposed uneven item counts, different input strategies, or a fairness principle the participant rejected.
  - Outcome control improved perceived fairness across groups. 22% of groups actually changed the allocation, but all groups judged the allocation fair after having the chance to adjust it; many concluded the algorithm's result was already the best available (p. 16).
- **Limits stated by the authors:** one algorithm, one interface, a one-time low-stakes goods task in a laboratory, collocated groups of varying size (p. 21).

---

## 4. Implications for this project

These are inferences from the findings above, not findings of the papers.

- The closest experimental evidence (Lee and Baykal, Study 2) found a computed chore split rated less fair than a discussed one, about 1.2 points lower on a 7-point scale for one's own outcome. It comes from strangers in a one-off task, so it cannot be assumed to transfer to partners with a shared history and repeated chores.
- The reasons given for unfairness bear directly on method design: many people expect an even split of an objective quantity such as time or task count; preference elicitation by numeric multipliers is error-prone and gameable; hidden inputs reduce trust in the group result.
- Lee et al. (2019) suggest that showing inputs and letting people adjust the result raises perceived fairness even when few change anything. That was shown for goods among groups, not chores between partners.
- Kajibuntan shows that an envy-freeness-based chore tool for couples has been built and used, using time, frequency and a three-level liking rating. It supplies no usable evidence yet on perceived fairness.

## 5. Open items

- Read the Kajibuntan PDF in an ordinary browser to verify section 1.3 (model, EF1 and Pareto optimality, algorithm, the 52 chores) and to check whether the paper reports any user data.
- The source and method of the "about 120 users, around 60% positive" survey are unknown.
- Appendix A of Lee et al. (2019) holds the per-phase fairness ratings.

## Sources

All URLs below were returned by tools in this session.

- [L17] Lee and Baykal (2017), doi:10.1145/2998181.2998230. Read at https://minlee.ischool.utexas.edu/materials/Publication/2017-CSCW-AlgorithmicMediation_Fairness.pdf
- [L19] Lee et al. (2019), doi:10.1145/3359284. Read at https://minlee.ischool.utexas.edu/materials/Publication/2019-CSCW-Al_ProceduralFairness.pdf
- [K-MLA] ML Anthology record for Igarashi and Yokoyama (2023): https://mlanthology.org/aaai/2023/igarashi2023aaai-kajibuntan
- [K-PC] papers.cool record: https://papers.cool/venue/27075@AAAI
- [K-S2] Semantic Scholar API record: https://api.semanticscholar.org/graph/v1/paper/DOI:10.1609/aaai.v37i13.27075
- [UT] University of Tokyo feature: https://www.u-tokyo.ac.jp/focus/en/features/z0508_00042.html
- [JST] JST research results page: https://www.jst.go.jp/EN/achievements/research/bt2023-04.html
- [I23] Igarashi, A., Lackner, M., Nardi, O. and Novaro, A. (2023). Repeated Fair Allocation of Indivisible Items. arXiv:2304.01644
- [E24] Elkind, E., Igarashi, A. and Teh, N. (2024). Fair Division of Chores with Budget Constraints. arXiv:2410.23979
- [L24] Liu, S., Lu, X., Suzuki, M. and Walsh, T. (2024). Mixed Fair Division: A Survey. arXiv:2306.09564
- [IG] First author's site: https://sites.google.com/site/eigarashayumi
- [IG-PUB] First author's publications page: https://sites.google.com/site/eigarashayumi/publications
- [APP-JP] https://kajibuntan.com
- [APP-EN] https://housechore-division.com/
- Not readable (bot protection): https://ojs.aaai.org/index.php/AAAI/article/view/27075 and https://ojs.aaai.org/index.php/AAAI/article/download/27075/26847
