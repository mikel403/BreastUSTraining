import { Box, Link } from "@chakra-ui/react";
import useAuthStore from "../store/store";

const HomePage = () => {
  const username = useAuthStore.getState().username;
  return (
    <>
      <h3>Webpage Information</h3>
      <p>
        We have created this site to be a link between students and experts in
        breast ultrasound imaging from all around the world. Here you can
        describe tumours, learn from your results and compare yourself with
        other experts. The descriptions and images you upload will be stored and
        used for research purpouses only. To this end, we are asking you to
        describe some ultrasound images, either from the available database or
        from your own uploaded images. The nodules of the dataset in the web
        application were taken from [1]. The descriptions will be done using the
        BI-RADS 5th edition, to make things quicker, the descriptions will be
        done as a test.{" "}
      </p>
      <p>
        This website has been created as part of the doctoral thesis of Mikel
        Carrilero-Mardones, supervised by Jorge Pérez-Martín and Francisco
        Javier Díez, at the Universidad Nacional de Educación a Distancia (UNED)
        and has been supported by grant PID2019-110686RB-I00 from the Spanish
        Government and grant PEJ-2021-AI/TIC-23268 from the Community of Madrid.
        Ana Delgado Laguna, as an expert radiologist, has helped Mikel in the
        development of the web, testing the results, the models and the
        interactions with the users. Special thanks to Manuela Parras Jurado and
        Dominica Dulnik Bucka, who also helped in the process of describing the
        first tumours to have an initial dataset.
      </p>
      <h3>What is in this for me?</h3>
      <ul>
        <li>
          You will have access to the artificial model described in the paper{" "}
          <a
            href="https://link.springer.com/article/10.1007/s10278-024-01155-1"
            target="_blank"
          >
            "Deep learning for describing breast ultrasound images with BI-RADS
            terms"
          </a>{" "}
          [2]. A model for tumour detection and description using the BI-RADS
          language. This model will help you to crop your own images to get the
          nodules you want to describe. Once you have described a nodule, you
          can compare your results with the AI. You can aslo request a
          personalised AI model after describing 150 tumours. This may seem like
          a lot, but in our experience it will take approximetly between an hour
          and an hour and a half of your time. The more tumours you describe,
          the more the model will learn from you. In this way, you can ask for
          the model to be updated every 150 tumours.
        </li>
        <li>
          You will be able to compare a tumour description with the rest of the
          experts. Once you have described a tumour you will be aible to compare
          yourself with a panel of experts who have also described that tumour.
        </li>
        <li>
          You can analyse your results statatistically.
          <ul>
            <li>
              Analyse your intracorrelation. If you describe tumours more than
              once (over a period of at least 2 weeks), you will be able to see
              your intracorrelation on the results page. This correlation is
              given using Cohen's kappa metric and tells you how well you agree
              with yourself.{" "}
            </li>
            <li>
              Database in tables and graphs. You will be able to access the
              results of your descriptions in organised tables and graphs
              showing the importance of each BI-RADS characteristic in the
              malignancy classification.
            </li>
          </ul>
        </li>
      </ul>
      <h3>Contact information</h3>
      This project is still under development. We would really appreciate any
      kind of feedback. Feel free to contact{" "}
      <Link
        href={`mailto:mcarrilero@dia.uned.es?subject=${encodeURIComponent(
          "BreastUSTraining feedback"
        )}`}
        isExternal
      >
        mcarrilero@dia.uned.es
      </Link>
      <div className="mt-4">
        <p>
          We hope that you will enjoy this website and that it will be an
          opportunity for you to learn from others and from yourself.
        </p>
        <strong>
          Thank you, {username}, for helping us with this project!
        </strong>{" "}
        {username == "TestUser" && (
          <div className="mt-3 text-danger">
            You have entered the website as a test user. You will not be able to
            save descriptions or images. However, you will be able to see all
            the features of the application. An expert radiologist's
            descriptions have been saved for this profile. You can compare them
            with those of other experts. You will also be able to use the AI
            models.
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
