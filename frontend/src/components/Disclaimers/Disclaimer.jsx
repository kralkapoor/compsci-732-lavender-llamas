import style from "./Disclaimer.module.css";
import Heading from "../Heading/Heading";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

function Disclaimers() {
  const [expandedAccordion, setExpandedAccordion] = useState();

  /* Initiates a MUI accordion that acts as a dropdown menu. Leaves previous accordion open */
  return (
    <Box>
      <Box>
        <Heading title="DISCLAIMERS AND FAQs" />
      </Box>
      <Box className={style.Accordion} style={{ paddingBottom: "3vh" }}>
        <Accordion>
          {/* Each accordion component has its own summary (title) and description */}
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={style.SummaryText}>
              We noticed that you only show weather for NZ towns. What's up with
              that?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={style.DescriptionText}>
              Good observation! At this stage we have only allowed users to
              select a town within NZ. Here at LLAMAFY, we have decided that
              since New Zealand has been left off the map far too often it is
              time to leave everywhere else off to give the rest of the world a
              taste of their own medicine. This is subject to change based on
              the frequency that we begin to appear on maps in future as the
              ability for the functionality to do so is there, but the will is
              not.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={style.SummaryText}>
              When generating my outfit images, I have noticed some
              ...interesting features on the models. Care to explain?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={style.DescriptionText}>
              Great question! In order to generate our images we rely on an
              artificial intelligence known as Dalle that generates artificial
              images based on the prompt that we feed it. One thing that AIs are
              not very good at doing so far is generating detailed human
              features on a clothing model. Because of this you may notice some
              features of our models look a little bit odd. Some common features
              you may encounter include (but are not limited to):
              <br />
              <ul>
                <li>Claw hands</li>
                <li>Funky faces </li>
                <li>Duck shoes</li>
                <li>Wonky legs</li>
                <li>Elongated Llama faces</li>
              </ul>
              <br />
              Think of this a bit like NY fashion week. We don't understand some
              of the design choices but we embrace them anyway.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={style.SummaryText}>
              Have you considered what future directions you may want to take
              with the LLAMAFY project?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={style.DescriptionText}>
              Good question! We do have some areas that we have considered
              expanding into to improve the experience for users. Such as:
            </Typography>
          </AccordionDetails>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={style.SummaryText}>
                Chaos mode button
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={style.DescriptionText}>
                Have you ever wanted to run the risk of showing up to a
                corporate meeting in speedos and cowboy boots? While now you can
                with our future direction of the chaos mode button. Rather than
                suggesting a stylish put together outfit chaos mode would allow
                you to randomise the oufit that you are generated. Great for
                Halloween, less so as a wedding guest.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={style.SummaryText}>
                Outfit and clothing recommentdations
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={style.DescriptionText}>
                A potential future avenue that we have been toying with is the
                ability for LLAMAFY to suggest and provide links to clothing
                items that the user may want to purchase for themselves to have
                a more complete wardrobe. This could be linked to existing
                available APIs that could allow for the user to be directly
                linked to a website such as ASOS.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={style.SummaryText}>
              We've gotta ask. Why the Llama theme?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={style.DescriptionText}>
              Simple. It's the hand we were dealt and the hooves we embrace.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={style.SummaryText}>
              So do you guys own an actual Llama?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={style.DescriptionText}>
              No. We put in an application to own one for the purpose of this
              project but the one that we hid in the closet ate the request.
              Luckily it was printed on non-toxic paper.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default Disclaimers;
