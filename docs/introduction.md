# Introduction

## Overview

BreastUSTraining is a web-based platform for structured annotation, training, and research in breast ultrasound description using the BI-RADS lexicon. The system enables users to repeatedly annotate breast nodules using standardised BI-RADS descriptors, compare their annotations with expert radiologists and AI model outputs, and receive quantitative feedback on intra- and inter-observer agreement.

The platform is designed as a reflective annotation and self-assessment environment rather than a standalone diagnostic or introductory teaching system. It is primarily intended for radiologists and trainees familiar with the BI-RADS lexicon, as well as researchers studying observer variability, AI-assisted annotation, and reproducible medical imaging workflows.

The application integrates expert reference annotations, AI-assisted descriptor estimation, and visual analytical tools within a secure client–server architecture that protects user-uploaded medical images through authenticated access and controlled media exposure.

---

## Scientific Motivation

BBreast ultrasound interpretation is inherently subjective and highly dependent on observer experience. Variability in BI-RADS descriptor assignment can lead to inconsistencies in lesion characterization and downstream clinical decision-making. In particular, differences in margin, shape, and posterior features frequently contribute to inter- and intra-observer disagreement.

BreastUSTraining addresses this challenge by providing a structured, repeatable annotation workflow combined with expert comparison and quantitative agreement analysis. By allowing users to describe the same cases over time and benchmark their annotations against expert panels and AI predictions, the platform facilitates systematic evaluation of annotation consistency and observer behaviour.

This design directly supports research on observer variability, reproducibility, and explainability in medical image interpretation, while also serving as a controlled environment for AI-assisted annotation studies.

---

## Relation to the Associated Publication

The AI-assisted description module implemented in the platform is based on the methodology described in:

> Carrilero-Mardones et al., 2024. Deep Learning for Describing Breast Ultrasound Images with BI-RADS Terms.

The publication defines the core pipeline integrated into the system, including:
- ROI detection for lesion localisation
- Deep learning models for BI-RADS descriptor estimation
- Probabilistic output interpretation for descriptor comparison
- Structured descriptor-based analysis aligned with BI-RADS terminology

The software architecture and documentation are designed to remain consistent with the research framework presented in the associated publication.
---

## Platform Objectives

The main objectives of BreastUSTraining are:

1. Provide a structured environment for BI-RADS-based ultrasound annotation
2. Support repeated and longitudinal case description
3. Enable comparison with expert radiologist annotations and reference panels
4. Integrate AI as an assistive, non-diagnostic annotation support tool
5. Quantify intra- and inter-observer agreement using statistical metrics (e.g., Cohen’s and Fleiss’ kappa)
6. Support reproducible research on observer variability and AI-assisted interpretation

---

## Target Users

- Radiologists and breast imaging specialists
- Radiology residents and trainees familiar with BI-RADS
- Medical imaging researchers
- Academic institutions conducting observer variability studies
- Developers and researchers working on AI-assisted medical annotation systems

---

## Key Capabilities

- Structured BI-RADS descriptor annotation interface
- AI-assisted descriptor prediction and comparison
- Expert panel benchmarking and selected-user comparison
- Longitudinal performance tracking and agreement analysis
- Secure authentication and protected media access (no direct public /media exposure)
- Modular client–server architecture for scalable research and training workflows