# Learning Study Group Reference

This file expands the operating rules used by `SKILL.md`. Labels distinguish **confirmed rules** from **suggested implementation details**.

## Group and topic model

- **Confirmed:** A group has four members: one user and three AI members.
- **Confirmed:** A/B/C/D roles rotate between topics.
- **Confirmed:** Each topic ends with a record of individual understanding and unresolved questions.
- **Suggested:** Support asynchronous work and show the current stage, owner, and incomplete items.

## Topic roles

| Role | Research responsibility | Topic contribution |
|---|---|---|
| A | Questioner | Asks the three core questions and submits an initial answer to each. Participates in learning, teaches the initial and revised understanding, and records why it changed. |
| B | Foundation researcher | Summarizes basic consensus and its main evidence. |
| C | Theory researcher | Compares representative schools or theories and their arguments. |
| D | Disagreement researcher | Explains key disagreements, evidence limits, and unresolved questions. |

All four members teach their findings and may question one another. Do not treat A as a facilitator who only asks questions. B/C/D should avoid repeating one another's assigned coverage. For recent or time-sensitive facts, show source and date.

**Suggested role rotation:** Rotate A→B→C→D assignments by one seat for each new topic, so each member eventually serves every role. If the user or AI membership changes, preserve the role history and determine the next assignment with the user.

## Topic stages

1. **Set scope:** Record the topic and boundaries. Show the roles for this topic.
2. **Ask and initial answer:** A asks:
   - What is the field's basic consensus?
   - Which major theories or schools disagree?
   - What are the key points of disagreement between them?

   A also answers each question initially, including evidence and uncertainty where possible. Preserve revisions rather than overwriting the initial answer.
3. **Research:** B, C, and D complete their assigned coverage. Attach sources to claims; for time-sensitive claims, include the source date and retrieval/publication date when available.
4. **Teach and question:** Each member gives a turn explaining findings; other members can ask questions. A reports initial thinking and what changed after hearing the group.
5. **Create twelve questions:** Every member creates three short-answer questions. Across the set, cover foundational understanding, viewpoint analysis, and application. Every question must have an author-provided reference answer and scoring criteria before it is finalized.
6. **Randomize, answer, and review:** Apply the confirmed rules and the balanced allocation below.
7. **Resolve disputes:** Discuss contested grading. If the answer standard itself is incomplete or ambiguous, revise it before reassessing affected answers.
8. **Reflect and archive:** Record evidence of understanding, self-assessment, feedback, unresolved questions, and completion status for every member.

## Question and scoring standard

**Confirmed rules:** Each member writes three questions, for twelve total. Questions cover foundational understanding, viewpoint analysis, and application. The question author supplies both a clear reference answer and scoring criteria; without both, the question is not eligible for the finalized set. The author can explain the intent and answer standard. If reasonable answers are missing or scoring criteria are ambiguous, the group discusses and revises the standard before reassessing affected answers.

**Suggested question fields:** prompt, question author, question type, reference answer points, scoring criteria, acceptable alternative answers, common misconceptions, and supporting sources. Criteria should let a reviewer explain which points were met, partly met, or missed. Keep versions and reasons for changes to finalized standards.

## Random pairs and balanced answer/review assignment

### Confirmed rules

- Randomly split the four members into two temporary pairs after the question set is finalized. Randomize again for every topic.
- Each member answers the six questions written by the other pair. Thus, each question gets two answers and each member answers six questions.
- Each pair reviews answers submitted by the other pair. Assign one reviewer from the submitting answer's opposing pair to every answer.
- No member reviews their own written answer. Each member reviews six answers in a complete round.
- An absent or incomplete member's work stays visibly incomplete; never fabricate a response or review.

### Suggested deterministic allocation within each random draw

Call the temporary pairs Alpha and Beta, with members A1/A2 and B1/B2. These labels are local to this topic and do not replace the learning roles A/B/C/D.

| Answer submitted by | Questions answered | Reviewer allocation | Per-member total |
|---|---|---|---|
| A1 | All six questions written by B1 and B2 | B2 reviews A1's answers to B1's three questions; B1 reviews A1's answers to B2's three questions | A1 answers 6 |
| A2 | All six questions written by B1 and B2 | B2 reviews A2's answers to B1's three questions; B1 reviews A2's answers to B2's three questions | A2 answers 6 |
| B1 | All six questions written by A1 and A2 | A2 reviews B1's answers to A1's three questions; A1 reviews B1's answers to A2's three questions | B1 answers 6 |
| B2 | All six questions written by A1 and A2 | A2 reviews B2's answers to A1's three questions; A1 reviews B2's answers to A2's three questions | B2 answers 6 |

This yields six reviews per person: B1 and B2 each review two answerers × three questions = six; A1 and A2 do the same in the reverse direction. Each of the twelve questions receives two answers. Each of the twenty-four answer submissions gets exactly one opposing-pair reviewer. The reviewer is neither the answer's author nor the question author in this proposed rotation. The question author can explain the standard, but the author is not the sole decision-maker in a dispute.

The table is a **suggested allocation method** that satisfies the confirmed workload and conflict constraints. Other implementations are acceptable only if they preserve all of those constraints and show a clear per-answer assignment.

### Assignment validation

Before publishing assignments, check that:

1. The draw has two pairs with two members each.
2. Each member is assigned all six questions from the other pair, with six answer slots total.
3. Each of twelve questions has two distinct answer slots.
4. Each of twenty-four answer slots has exactly one reviewer from the other pair.
5. No reviewer is the author of the answer being reviewed. The suggested allocation also excludes the question author from initial grading.
6. In a complete round, every member has six answer assignments and six review assignments.

If absence makes a slot impossible, keep unaffected assignments and label the affected slot `待作答` or `待批改`. Do not silently reduce the counts or label an incomplete slot complete. Reassignment must still use an eligible reviewer and must not assign a member their own answer.

## Review and dispute handling

**Confirmed rules:** Review against the question author's reference answer and scoring criteria. The author may explain intent and answer points but cannot decide a dispute about their own question alone. If standards omit a reasonable answer or have ambiguous criteria, discuss and revise the standard first, then reassess all affected answers. Preserve dispute reason, final conclusion, and unresolved disagreement.

**Suggested review record:** answer, question and standard version, reviewer, per-criterion assessment, explanation, overall feedback, submission/review timestamps, dispute reason, participants, revised standard if any, reassessment result, final conclusion, and remaining dissent.

Suggested handling sequence:

1. Reviewer assesses against the stated criteria and explains the assessment.
2. The respondent may challenge a specific criterion and explain why.
3. The question author clarifies intent and standard but does not rule alone.
4. If the standard is ambiguous or incomplete, the group revises it and reassesses all affected answers.
5. Record the group's conclusion and any remaining disagreement. If there are not enough available members to review, mark the review incomplete.

## End-of-topic learning record

Do not use one score as the sole signal of learning. Suggested dimensions:

- Basic consensus, theories, key disagreements, evidence evaluation, and application.
- For each dimension: `能独立解释`, `需要提示`, or `尚不确定`, with evidence from explanations or answers.
- Peer feedback and criterion-level gaps, including unresolved grading disputes.
- Member self-assessment and a short reason; show disagreement between self-assessment and peer review side by side.
- Open questions with relevant evidence and a status such as pending, progressing, or unresolved.
- A's initial answer compared with the final understanding and the reason for changes.
- Member-level completion status for questions, answers, reviews, and reflection. Do not rank members.

## Edge cases

| Situation | Handling |
|---|---|
| A member does not submit questions or answer standards | Keep those questions out of the finalized set; mark the member's submission incomplete. Do not present AI-generated material as author-approved. |
| A member does not answer | Mark the answer slot `待作答`; do not invent a response. Keep other assignments and show the missing slot. |
| A member does not review | Mark the assigned answer `待批改`; reassign only to an eligible opposing-pair reviewer. If none is available, leave it incomplete. |
| A member is absent and pair balance cannot be maintained | Preserve the draw and actual assignments, mark affected slots incomplete, and report actual completed counts. Whether to redraw or reassign is a product decision; never fake completion. |
| Sources conflict | Show claims, dates, evidence, and scope side by side. Keep unresolved conflicts open rather than forcing consensus. |
| A current claim cannot be verified | Label it unverified and show the search/retrieval date and accessible sources. Do not present model recollection as verified fact. |
| A standard misses a reasonable answer or is ambiguous | Pause affected grading, discuss and revise the standard, then reassess every affected answer. Keep the prior version and rationale. |
| A grading dispute remains unresolved | Record the reason, final/current conclusion, and outstanding disagreement. Do not let the question author settle it alone. |
| A's initial answer changes | Keep the initial version and record the revised answer and reason. |
