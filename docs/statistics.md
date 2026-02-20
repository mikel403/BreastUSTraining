# Statistical Analysis and Results Interface

## Overview

BreastUSTraining provides an integrated statistical analysis module that allows users to evaluate their BI-RADS descriptions through quantitative metrics, visual analytics, and real-time comparison with both expert radiologists and AI predictions.

The statistics module is a core component of the educational workflow, designed to improve descriptor consistency, interpretability, and diagnostic training through objective feedback.

Unlike traditional static evaluation systems, the platform supports:
- Longitudinal self-consistency analysis
- Real-time comparison after each tumour description
- Expert panel benchmarking
- AI-assisted comparison
- Visual distribution analysis of descriptors

---

## Results Page Functionality

The Results page is the primary feedback interface where users can understand and interpret their annotation behaviour.

It provides three main analytical blocks:
1. Agreement metrics (tables)
2. Team impact analysis (Δ Fleiss’ kappa)
3. Statistical graphs and distribution visualisations

This design allows both immediate feedback (per tumour) and global performance tracking over time.

---

## Real-Time Comparative Evaluation

After describing a tumour, the platform enables immediate comparison between:

- The user’s annotation
- The AI model predictions (paper-aligned pipeline)
- Other radiologists in the system

This real-time comparison is intended for educational purposes and helps users identify discrepancies in descriptor interpretation at the moment of annotation.

---

## Agreement Metrics

### 1. Intraobserver Agreement

Intraobserver agreement measures the consistency of a single user when describing the same tumour across multiple sessions.

This metric answers:
> “How consistent am I over time?”

It is computed using Cohen’s Kappa across repeated annotations of identical nodules.

High intraobserver agreement indicates:
- Stable interpretation patterns
- Learning consolidation
- Reduced subjective variability

---

### 2. Interobserver Agreement (User vs Radiologist)

The platform allows users to search for a specific radiologist and compute agreement using Cohen’s Kappa.

Key characteristics:
- Calculated per BI-RADS descriptor (shape, margin, orientation, etc.)
- Only cases annotated by both raters are included
- Reported alongside the number of valid comparisons (N)

This supports direct benchmarking against expert or peer annotations.

---

### 3. Team Agreement Impact (Δ Fleiss’ Kappa)

A unique feature of the platform is the computation of the user’s impact on overall team agreement.

Δ Fleiss’ Kappa represents:
> The change in team agreement when the user’s annotations are included versus excluded.

This metric evaluates:
- Contribution to consensus
- Alignment with expert interpretation
- Influence on group-level reproducibility

Negative Δ Fleiss’ Kappa may indicate systematic disagreement with the expert panel.

---

## Descriptor-Level Agreement Analysis

Agreement is computed separately for each BI-RADS descriptor, including:
- Shape
- Margin
- Orientation
- Echogenicity
- Posterior features
- Calcifications
- Special cases
- Final BI-RADS category

This fine-grained approach enables targeted educational feedback by identifying which descriptors present the greatest variability.

---

## Graphical Statistical Analysis

### Descriptor Distribution Graphs

The platform includes interactive graphs showing the distribution of descriptor categories across BI-RADS assessments.

Two normalisation modes are available:

#### 1. Descriptor Normalisation
Shows how BI-RADS categories vary for each descriptor category.
- Each descriptor line sums to 100%
- Useful for understanding how specific features influence BI-RADS assignment

#### 2. BI-RADS Normalisation
Shows which descriptor categories are most common within each BI-RADS group.
- Each BI-RADS column sums to 100%
- Useful for pattern recognition and diagnostic learning

---

### Personal vs Overall Comparison Graphs

Users can compare their descriptor patterns with:
- The overall radiologist population
- Selected individual radiologists

These graphs help identify:
- Systematic biases
- Overuse or underuse of certain descriptors
- Deviations from expert interpretation patterns

---

## Correlation Tables and Sample Size Transparency

All agreement values are presented together with the number of valid observations (N) used for each calculation.

Important rule:
Only nodules for which both raters provided a descriptor are included in the agreement computation.

This ensures:
- Statistical validity
- Transparency
- Reproducibility of reported metrics

---

## AI Comparison in the Educational Workflow

In addition to human comparison, users can evaluate their tumour descriptions against the AI model outputs described in the associated publication.

This enables:
- AI-assisted learning
- Human-AI agreement analysis
- Explainable descriptor validation

The AI is positioned as a support tool, not a replacement for clinical judgement.

---

## Longitudinal Learning and Research Value

All statistical metrics are stored over time, enabling:
- Learning curve analysis
- Observer variability studies
- Educational performance tracking
- Reproducible research experiments

This longitudinal design aligns with the research objectives of observer agreement analysis in medical imaging and supports academic evaluation of training effectiveness.

---

## Research and Publication Alignment

The statistical framework is consistent with observer agreement methodologies commonly used in radiology research, particularly:
- Cohen’s Kappa for pairwise agreement
- Fleiss’ Kappa for multi-rater agreement
- Descriptor-level variability analysis

These metrics support rigorous evaluation of diagnostic consistency and align with the scientific goals described in the associated BreastUSTraining and AI methodology publications.