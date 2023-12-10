//style
import { Card, Heading, Typography } from "@ensdomains/thorin";
import "./Statistica.scss";

const Statistica = () => {
  return (
    <section className="Statistica">
      <Card className="statistica_item">
        <Heading color="background">Security</Heading>
        <Typography color="background">Decentralization ensures robust security, reducing the risk of hacking.</Typography>
      </Card>
      <Card className="statistica_item">
        <Heading color="background">Automation</Heading>
        <Typography color="background">Smart contracts automate rental processes, ensuring efficient.</Typography>
      </Card>{" "}
      <Card className="statistica_item">
        <Heading color="background"> Flexible Payments</Heading>
        <Typography color="background">Tokenization allows tenants to make payments with cryptocurrency tokens.</Typography>
      </Card>
    </section>
  );
};

export default Statistica;
