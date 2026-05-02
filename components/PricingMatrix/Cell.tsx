import { Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckRounded";
import RemoveIcon from "@mui/icons-material/RemoveRounded";
import type { CellValue } from "@/lib/pricing";

export default function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <Box
        component="span"
        aria-label="Included"
        title="Included"
        sx={{ display: "inline-flex", color: "primary.main" }}
      >
        <CheckIcon fontSize="small" />
      </Box>
    );
  }
  if (value === false) {
    return (
      <Box
        component="span"
        aria-label="Not included"
        title="Not included"
        sx={{ display: "inline-flex", color: "text.disabled" }}
      >
        <RemoveIcon fontSize="small" />
      </Box>
    );
  }
  return (
    <Box
      component="span"
      sx={{
        fontVariantNumeric: "tabular-nums",
        color: "text.primary",
        fontWeight: 500,
        fontSize: 14,
      }}
    >
      {value}
    </Box>
  );
}
