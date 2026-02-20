# Reproducibility and Scope of the AI Integration

## Purpose of This Document

This document clarifies the relationship between the AI models described in the associated scientific publication and their integration within the BreastUSTraining web platform.

BreastUSTraining is designed as an educational and observer-analysis system that integrates AI-assisted feedback, not as a standalone repository intended to reproduce the full experimental training pipeline of the research models.

---

## Relationship to the Associated Publication

The AI methodology described in the associated publication focuses on deep learning for breast ultrasound interpretation using BI-RADS descriptors, including:
- ROI detection using object detection models,
- CNN-based descriptor extraction with attention mechanisms,
- descriptor-based BI-RADS estimation,
- rule-based interpretation support.

The web platform adopts the conceptual framework of this methodology to support interactive training, comparison, and educational feedback within a clinical learning environment.

---

## Reproducibility Scope of the Web Platform

BreastUSTraining is not intended to serve as a model training or benchmarking repository. Instead, it is a web-based system that embeds AI components into a structured annotation and evaluation workflow.

Specifically, the platform is designed to:
- allow users to annotate BI-RADS descriptors,
- compare their annotations with expert panel references,
- receive AI-assisted feedback,
- analyse intraobserver and interobserver agreement through statistical metrics.

As such, the primary reproducible elements of the platform are:
- the annotation workflow,
- the statistical evaluation pipeline,
- the user–AI–expert comparison framework,
- and the system architecture enabling interactive training.

---

## AI Pipeline: Conceptual Alignment vs Platform Integration

The AI components integrated in the platform are conceptually aligned with the methodology described in the publication but are embedded within a web-based educational system rather than an experimental training environment.

Within the application:
- ROI localisation is performed prior to descriptor analysis,
- descriptor-level predictions are used as part of the educational comparison workflow,
- AI outputs are presented alongside expert panel annotations and user descriptions.

The platform therefore uses AI as an **assistive and comparative component**, not as an autonomous diagnostic system or a direct reproduction of the research training pipeline.

---

## Classifier Design in the Application Context

The publication describes descriptor-based BI-RADS estimation within a research modelling framework.  
In the web platform, the descriptor-to-category estimation is implemented as a probabilistic classifier operating on predicted BI-RADS descriptors as part of the educational feedback system.

This design decision is intrinsic to the application architecture and was adopted from the initial development of the platform to support:
- interpretability at the descriptor level,
- stable integration into an interactive web environment,
- real-time comparison with expert panel annotations and user inputs.

It does not affect:
- the descriptor annotation workflow,
- the statistical agreement analysis,
- or the educational comparison objectives of the system.

---

## Educational vs Experimental Reproducibility

It is important to distinguish between:
- **Experimental reproducibility** (replicating model training pipelines and performance metrics), and
- **Educational system reproducibility** (replicating the annotation, comparison, and evaluation environment).

BreastUSTraining prioritises reproducibility of:
- the observer study workflow,
- the statistical analysis framework (e.g., agreement metrics),
- the structured BI-RADS training interface,
- and the AI-assisted comparison process.

The platform is therefore best interpreted as a reproducible research software tool for training and observer analysis, rather than a reproduction package for the underlying deep learning model training procedures.

---

## Intended Use in Research and Training

The system is designed for:
- radiology training,
- observer variability studies,
- AI-assisted educational evaluation,
- and reproducible analysis of descriptor-based interpretations.

AI outputs are integrated strictly as assistive feedback and comparison references within the training workflow, consistent with the platform’s educational and research objectives.