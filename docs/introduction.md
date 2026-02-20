# Introduction

## Overview

BreastUSTraining is a web-based educational and research platform designed to support training in breast ultrasound interpretation using the BI-RADS lexicon. The system integrates artificial intelligence, expert panel benchmarking, and quantitative statistical feedback to improve diagnostic consistency and descriptor learning.

The platform enables users to annotate breast ultrasound cases, compare their annotations with expert consensus, and receive objective performance metrics. It is intended for radiology trainees, researchers, and clinicians interested in observer variability, medical AI-assisted education, and reproducible training environments.

---

## Scientific Motivation

Breast ultrasound interpretation is inherently subjective and highly dependent on observer experience. Variability in BI-RADS descriptor assignment can lead to inconsistencies in diagnosis and clinical decision-making. Training platforms that provide structured feedback and expert comparison are essential to reduce inter- and intra-observer variability.

BreastUSTraining addresses this need by combining:
- Standardized BI-RADS annotation workflows
- AI-assisted descriptor support
- Expert panel comparison
- Quantitative agreement metrics (e.g., Cohen’s Kappa)

This approach aligns with research objectives focused on reproducibility, explainability, and educational impact in medical imaging.

---

## Relation to the Associated Publication

The AI methodology implemented in this platform is based on the models described in the associated publication:

> Carrilero-Mardones et al., 2024. Deep Learning for Describing Breast Ultrasound Images with BI-RADS Terms.

The paper defines the core pipeline including:
- YOLO-based ROI detection
- CNN with attention for descriptor extraction
- Multinomial logistic regression for BI-RADS category estimation
- Rule-based post-processing and natural language generation

This documentation prioritizes the paper-aligned architecture for scientific consistency.

---

## Platform Objectives

The main objectives of BreastUSTraining are:

1. Provide an interactive environment for BI-RADS learning
2. Support repeated annotation of ultrasound cases
3. Compare user performance with expert annotations
4. Integrate AI as an assistive tool
5. Quantify observer agreement using statistical metrics
6. Enable reproducible research in medical image interpretation

---

## Target Users

- Radiology residents and trainees
- Medical imaging researchers
- Clinicians specializing in breast imaging
- Academic institutions conducting observer studies
- Developers working on medical AI education tools

---

## Key Capabilities

- Case-based ultrasound annotation interface
- AI-assisted descriptor suggestion (paper-aligned pipeline)
- Expert panel benchmarking
- Longitudinal performance tracking
- Secure authentication and user management
- Modular client-server architecture for scalability