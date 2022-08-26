import Header from "../../components/header";
import Footer from "../../components/footer";
import TextSection from "../../components/textSection";
import Summary from "src/components/summary/Summary";
import styles from "./SummaryPage.module.scss";

function SummaryPage() {
   return (
      <div className={styles.HomePageIndex}>
         <Header />

         <TextSection
            blueText={true}
            text="Veja seu relatório de negociações"
         />

         <Summary />

         <Footer />
      </div>
   );
}

export default SummaryPage;
