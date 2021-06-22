import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Box } from "@material-ui/core";

import SidebarList from "./SidebarList";

const Sidebar = function ({ data = [] }) {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <Box mb={8}>
        {data.length > 0 &&
          data.map((item) => (
            <Accordion expanded={expanded === item.name} onChange={handleChange(item.name)} key={item.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={item.name} id={item.name}>
                <Typography>{item.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SidebarList {...item} />
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>

      {/* <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          history.push("/help/my/tickets");
        }}
      >
        Take me to support
      </Link> */}
    </Box>
  );
};

export default Sidebar;
