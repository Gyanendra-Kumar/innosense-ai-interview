import { TooltipType } from "../../types.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const IaTooltip = ({ children, content }: TooltipType) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>{children}</div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default IaTooltip;
