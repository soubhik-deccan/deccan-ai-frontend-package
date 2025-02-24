import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import DOMPurify from "dompurify";
import React from "react";
import { TPHtmlTooltipContentProps, TPHtmlTooltipProps } from "./type";

const PTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(14),
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
  },
}));

const PHtmlTooltipContent: React.FC<TPHtmlTooltipContentProps> = ({
  htmlContent,
}) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlContent, {
    USE_PROFILES: { html: true },
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

const PHtmlTooltip: React.FC<TPHtmlTooltipProps> = ({
  htmlContent,
  children,
}) => {
  return (
    <PTooltip title={<PHtmlTooltipContent htmlContent={htmlContent} />} arrow>
      {children}
    </PTooltip>
  );
};

export default PHtmlTooltip;
