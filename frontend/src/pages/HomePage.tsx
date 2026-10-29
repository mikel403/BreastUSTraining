import TranslationText from "../TranslationText";
import { Box, Link } from "@chakra-ui/react";
import useAuthStore from "../store/store";
import useUser from "../User/userHooks/useUser";

const HomePage = () => {
  const { data: user } = useUser();
  const isPhysician = !!user?.is_physician;
  const username = useAuthStore.getState().username;
  return (
    <>
      <h3><TranslationText text={"Webpage Information"} /></h3>
      <p>
        <TranslationText text={"BreastUSTraining is a web-based platform for practical training and research in structured BI-RADS breast ultrasound annotation. Users can repeatedly describe breast nodules using standardised BI-RADS descriptors, compare their annotations with expert radiologists and AI model outputs, and receive quantitative feedback on intra- and inter-observer agreement (Cohen’s and Fleiss’ kappa). The platform is intended as a reflective annotation and self-assessment tool for radiologists and trainees familiar with the BI-RADS lexicon, and is not designed for diagnostic use."} /> </p>
      <p>
        <TranslationText text={"Users may describe tumours from a publicly available dataset or upload their own anonymised ultrasound images. Uploaded images are private by default and only visible to the uploading user and system administrators for maintenance and aggregated research purposes. In addition to the standard BI-RADS mass descriptors (shape, margin, orientation, echo pattern, and posterior features), the platform includes a limited number of tumour-related fields commonly used in clinical lesion characterisation (calcifications within the mass and selected special cases)."} /> </p>
      <p>
        <TranslationText text={"This platform was developed as part of the doctoral thesis of Mikel Carrilero-Mardones at Universidad Nacional de Educación a Distancia (UNED). The initial expert comparison panel was created by three radiologists specialised in breast imaging, with more than 30, 20, and 6 years of clinical experience in specialised breast imaging units. Their annotations are provided as a reference panel for comparison and observer variability analysis, rather than as absolute ground truth. Their usernames for comparison are Manuela, Ana and Dominica."} /> </p>
      {!isPhysician && (
        <>
          <h3><TranslationText text={"Profile"} /></h3>
          <p>
            <strong><TranslationText text={"Registered users"} /></strong> <TranslationText text={"can access all functionalities of the platform, but their annotations are"} />{" "}
            <strong><TranslationText text={"not included in the expert panel"} /></strong>. <TranslationText text={"Only"} />{" "}
            <strong><TranslationText text={"radiologist users"} /></strong> <TranslationText text={"are considered for expert comparisons."} /> <br />
            <br />
            <TranslationText text={"In addition, only"} /> <strong><TranslationText text={"radiologist users"} /></strong> <TranslationText text={"can make their data"} /> <strong> <TranslationText text={"public"} /></strong> <TranslationText text={"or available for"} />{" "}
            <strong><TranslationText text={"research purposes"} /></strong>.
            <br />
            <br />
            <TranslationText text={"If you are a radiologist and would like to"} />{" "}
            <strong><TranslationText text={"contribute to the expert panel"} /></strong> <TranslationText text={"and support this project, please contact"} />{" "}
            <Link
              href={`mailto:mcarrilero@dia.uned.es?subject=${encodeURIComponent(
                "Radiologist user profile",
              )}`}
              isExternal
            >
              mcarrilero@dia.uned.es
            </Link>
            .
          </p>
        </>
      )}
      <h3><TranslationText text={"What's in it for me?"} /></h3>
      <ul>
        <li>
          <TranslationText text={"You will have access to the AI model described in"} />{" "}
          <a
            href="https://link.springer.com/article/10.1007/s10278-024-01155-1"
            target="_blank"
          >
            "Deep learning for describing breast ultrasound images with BI-RADS
            terms"
          </a>{" "}
          [2]. <TranslationText text={"This includes tumour detection and BI-RADS-based description support. The detection model can help you crop your own images to extract the nodule region before describing it. After you describe a nodule, you can compare your annotations with the AI output."} />
        </li>
        <li>
          <TranslationText text={"You will be able to compare your tumour descriptions with those of other experts. When a tumour has been described by multiple radiologists, you can view your annotation alongside the expert panel."} /> </li>
        <li>
          <TranslationText text={"You can analyse your results statistically."} /> <ul>
            <li>
              <strong><TranslationText text={"Intraobserver agreement:"} /></strong> <TranslationText text={"if you describe the same tumour more than once (with at least a 2-week gap), the results page will show your intraobserver agreement using Cohen’s kappa (how consistent you are with yourself over time)."} />
            </li>
            <li>
              <strong><TranslationText text={"Interobserver agreement:"} /></strong> <TranslationText text={"The results page will show your agreement with another selected user using Cohen’s kappa. You can also evaluate your impact on team agreement using the difference in Fleiss’ kappa (agreement with the team when your annotations are included versus excluded)."} />
            </li>
            <li>
              <strong><TranslationText text={"Tables and graphs:"} /></strong> <TranslationText text={"you can explore your annotations in structured tables and graphs that summarise how descriptor categories are distributed across BI-RADS assessments."} />
            </li>
          </ul>
        </li>
      </ul>
      <h3><TranslationText text={"Disclaimer and Data Usage"} /></h3>
      <p>
        <TranslationText text={"This platform is intended exclusively for research, training, and workflow-oriented annotation practice using the BI-RADS lexicon. It is not a clinical decision-support system and must not be used for diagnostic purposes."} /> </p>
      <p>
        <TranslationText text={"Users are solely responsible for the content they upload. Only anonymised ultrasound images that the user is authorised to share should be uploaded. The platform does not require or process patient-identifiable metadata (e.g., DICOM personal information), and users are encouraged to crop images to remove any identifying overlays before saving them."} /> </p>
      <p>
        <TranslationText text={"All uploaded images and annotations are private by default and are only visible to the uploading user and the system administrators for maintenance, security, and aggregated research analysis. User-uploaded content is not publicly shared, incorporated into the expert panel, or used as clinical ground truth."} /> </p>
      <p>
        <TranslationText text={"The developers assume no responsibility for the content uploaded by users or for any misuse of the platform. By using this website, users agree that they will not upload identifiable patient data or any unlawful, inappropriate, or non-medical content."} /> </p>
      <h3><TranslationText text={"Contact information"} /></h3>
      <TranslationText text={"This project is still under active development, and we would greatly appreciate your feedback. Feel free to contact"} />{" "}
      <Link
        href={`mailto:mcarrilero@dia.uned.es?subject=${encodeURIComponent(
          "BreastUSTraining feedback",
        )}`}
        isExternal
      >
        mcarrilero@dia.uned.es
      </Link>
      <div className="mt-4">
        <p>
          <TranslationText text={"We hope you enjoy the platform and that it helps you learn from your own annotations and from other experts."} /> </p>
        <strong>
          <TranslationText text={"Thank you,"} /> {username}<TranslationText text={", for helping us with this project!"} /> </strong>{" "}
        {username == "TestUser" && (
          <div className="mt-3 text-danger">
            <TranslationText text={"You are currently using a test account. You can explore all features of the application, but you cannot save new descriptions or images. This profile contains sample expert annotations so you can try comparisons and use the AI models."} /> </div>
        )}
      </div>
      <Box mt={4}>
        <p><TranslationText text={"Bibliography:"} /></p>
        <p>
          [1] W. Al-Dhabyani, M. Gomaa, H. Khaled, A. Fahmy, Dataset of breast
          ultrasound images, Data in brief, vol. 28, p. 104863, 2020. DOI:{" "}
          <Link href="https://doi.org/10.1016/j.dib.2019.104863" isExternal>
            10.1016/j.dib.2019.104863
          </Link>
          .
        </p>
        <p>
          [2] M. Carrilero-Mardones, M. Parras-Jurado, A. Nogales, J.
          Pérez-Martín, F. J. Díez, Deep learning for describing breast
          ultrasound images with bi-rads terms, Journal of Imaging Informatics
          in Medicine, p. 1-15, 2024.
        </p>
      </Box>
    </>
  );
};

export default HomePage;
