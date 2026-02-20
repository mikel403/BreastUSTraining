# AI Models (Paper-Aligned)

This project integrates two AI components to support breast ultrasound training:

1. **Lesion detection (ROI proposal)** using a YOLO-based detector.
2. **BI-RADS description and malignancy modeling** using a multi-task CNN with attention, followed by an explainable BI-RADS category model and a rule-based natural language generator.

The complete model pipeline is described in *Carrilero-Mardones et al., 2024* (“Deep Learning for Describing Breast Ultrasound Images with BI-RADS Terms”). :contentReference[oaicite:1]{index=1}

---

## 1) ROI Detection with YOLO (Preprocessing)

The pipeline starts by detecting nodules and extracting **Regions of Interest (ROIs)** using **YOLO**. The paper reports using **YOLOv8**, highlighting real-time performance (≈50 FPS) and flexibility with varying image sizes. :contentReference[oaicite:2]{index=2}

### ROI standardization
- If the detected ROI width or height is **> 450 pixels**, it is resized while preserving aspect ratio (important for descriptors like orientation).
- ROIs are then **zero-padded** to **450×450**. :contentReference[oaicite:3]{index=3}

This preprocessing helps remove non-essential image regions and improves downstream descriptor prediction performance. :contentReference[oaicite:4]{index=4}

---

## 2) BI-RADS Descriptor Extraction (CNN + Attention)

After ROI extraction, the core model performs **multi-task prediction**:
- BI-RADS descriptors (shape, margin, orientation, echogenicity, posterior features, halo)
- “Suggestivity” / tumor type (e.g., fibroadenoma; plus “no clear suggestivity”)
- Boolean malignancy classification (benign vs malignant)

### Encoder
The encoder consists of:
- A **convolutional layer + max pooling + GELU** activation,
- Followed by **VGG16**, producing a feature map of size **14×14×512**.
This is treated as a **196×512 feature-space matrix (F)**, then batch-normalized. 

### Attention mechanism
An attention module computes a weighted average (“context”) over the 196 feature vectors, producing a **512-dimensional context vector** used for classification. :contentReference[oaicite:6]{index=6}

### Output heads
The context feeds multiple dense heads:
- One dense head per descriptor (shape, margin, orientation, echogenicity, posterior, halo).
- **Orientation** uses a sigmoid output with a threshold (paper sets an empirical threshold of **0.3**) because some nodules may be neither clearly parallel nor anti-parallel. :contentReference[oaicite:7]{index=7}
- Suggestivity/tumor type is predicted using the descriptor outputs + context, with an added “no clear suggestivity” label. :contentReference[oaicite:8]{index=8}
- Boolean malignancy classification uses descriptors + context + suggestivity. :contentReference[oaicite:9]{index=9}

---

## 3) BI-RADS Category via Multinomial Logistic Regression (Explainable)

The BI-RADS malignancy category (e.g., BI-RADS 2/3/4A/4B/4C/5) is produced by a **multinomial logistic regression** that takes **the predicted descriptors** as input. :contentReference[oaicite:10]{index=10}

The paper explicitly separates this stage from the CNN to improve performance and explainability: the BI-RADS category depends on descriptors rather than raw pixels, enabling interpretation via model weights. 

Due to recent studies yet tu publish, we have changed the multinomial logisti regression model to a naive-bayes model.

---

## 4) Rule-Based Module + Natural Language Output

Finally, a rule-based post-processing module:
- Fine-tunes certain outputs using BI-RADS rules, and
- Generates natural language descriptions (report-like output).

Two explicit rules are highlighted:
1. If the nodule is **round**, it has **no orientation**.
2. If classified as **simple cyst**, **complex cyst**, or **spiculated**, the BI-RADS category is set to **2**, **4A**, and **5**, respectively. :contentReference[oaicite:12]{index=12}

The rule-based module can generate a textual description without changing core model predictions beyond these rules. :contentReference[oaicite:13]{index=13}

---

## 5) Reported Performance Summary (from the paper)

The paper reports:
- YOLO detection performance (precision/recall/AP) and emphasizes ROI quality for posterior features. :contentReference[oaicite:14]{index=14}
- Descriptor agreement with an expert radiologist using Cohen’s kappa, with improvements attributable to YOLO preprocessing and the attention-based architecture. 

See the paper for full experimental details, comparisons against other CNN baselines, and ablation analysis. :contentReference[oaicite:16]{index=16}

## Relationship Between the Published AI Models and the Web Platform

The AI methodology described in the associated publication focuses on the research pipeline for BI-RADS descriptor extraction and classification from breast ultrasound images.

The BreastUSTraining web platform integrates AI models as an **educational and assistive component**, not as a strict reproduction of the experimental training pipeline described in the paper.

Specifically:
- The CNN-based descriptor extraction framework described in the publication is conceptually aligned with the platform’s AI-assisted workflow.
- The platform uses a probabilistic classifier operating on predicted descriptors for BI-RADS educational feedback.

Importantly, the web application was designed from the outset as a training and comparison system (user vs AI vs expert panel), rather than as a research reproduction environment of the original model training pipeline.

Therefore, the AI components in the application should be interpreted as **assistive educational models integrated into a web-based training system**, not as an exact implementation of the research training architecture.