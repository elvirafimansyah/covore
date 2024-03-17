import Container from "@/components/container"
import CardCases from "./card";

const GlobalCases = () => {
  return ( 
    <section id="globalcases" className="bg-lightgray py-10 md:py-16 lg:py-20">
      <Container>
        <h2 className="text-3xl font-bold mb-6">Global Cases</h2>
        <CardCases />
      </Container>
    </section>
  );
}

export default GlobalCases;