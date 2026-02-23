import { Box, Link } from "@chakra-ui/react";
import useAuthStore from "../store/store";

const HomePage = () => {
  const username = useAuthStore.getState().username;
  return (
    <>
      <h3>Webpage Information</h3>
      <p>
        This website connects students and expert breast ultrasound radiologists
        from around the world. Here you can describe tumours using BI-RADS
        terminology, review your results, and compare your annotations with
        those of other experts. The descriptions and images you upload are
        stored and used for research purposes only. You can describe cases from
        the public dataset or upload your own ultrasound images. The dataset
        nodules available in the application were obtained from [1].
        Descriptions follow the BI-RADS 5th edition.
        <br />
        <br />
        In addition to the standard BI-RADS ultrasound descriptors, the platform
        includes a small number of tumour-related fields commonly used in
        clinical reporting (e.g., presence of calcifications within the nodule
        and selected special-case patterns such as simple cyst). To make
        the workflow quicker, the platform is designed as a structured,
        test-like annotation process.
      </p>
      <p>
        This website was developed as part of the doctoral thesis of Mikel
        Carrilero-Mardones, supervised by Jorge Pérez-Martín and Francisco
        Javier Díez at Universidad Nacional de Educación a Distancia (UNED). The
        project was supported by grant PID2019-110686RB-I00 (Spanish Government)
        and grant PEJ-2021-AI/TIC-23268 (Community of Madrid). Ana Delgado
        Laguna, as an expert radiologist, contributed to the development of the
        platform by testing the application, models, and user interactions.
        Special thanks to Manuela Parras Jurado and Dominica Dulnik Bucka for
        helping to create the initial annotated dataset.
      </p>
      <h3>What's in it for me?</h3>
      <ul>
        <li>
          You will have access to the AI model described in{" "}
          <a
            href="https://link.springer.com/article/10.1007/s10278-024-01155-1"
            target="_blank"
          >
            "Deep learning for describing breast ultrasound images with BI-RADS
            terms"
          </a>{" "}
          [2]. This includes tumour detection and BI-RADS-based description
          support. The detection model can help you crop your own images to
          extract the nodule region before describing it. After you describe a
          nodule, you can compare your annotations with the AI output.
        </li>
        <li>
          You will be able to compare your tumour descriptions with those of
          other experts. When a tumour has been described by multiple
          radiologists, you can view your annotation alongside the expert panel.
        </li>
        <li>
          You can analyse your results statistically.
          <ul>
            <li>
              <strong>Intraobserver agreement:</strong> if you describe the same
              tumour more than once (with at least a 2-week gap), the results
              page will show your intraobserver agreement using Cohen’s kappa
              (how consistent you are with yourself over time).
            </li>
            <li>
              <strong>Interobserver agreement:</strong> The results page will
              show your agreement with another selected user using Cohen’s
              kappa. You can also evaluate your impact on team agreement using
              the difference in Fleiss’ kappa (agreement with the team when your
              annotations are included versus excluded).
            </li>
            <li>
              <strong>Tables and graphs:</strong> you can explore your
              annotations in structured tables and graphs that summarise how
              descriptor categories are distributed across BI-RADS assessments.
            </li>
          </ul>
        </li>
      </ul>
      <h3>Contact information</h3>
      This project is still under active development, and we would greatly
      appreciate your feedback. Feel free to contact{" "}
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
          We hope you enjoy the platform and that it helps you learn from your
          own annotations and from other experts.
        </p>
        <strong>
          Thank you, {username}, for helping us with this project!
        </strong>{" "}
        {username == "TestUser" && (
          <div className="mt-3 text-danger">
            You are currently using a test account. You can explore all features
            of the application, but you cannot save new descriptions or images.
            This profile contains sample expert annotations so you can try
            comparisons and use the AI models.
          </div>
        )}
      </div>
      <Box mt={4}>
        <p>Bibliography:</p>
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
