import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const EmojiPicker = (props: {
  icon: unknown;
  onChange: (arg0: string) => void;
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    // @ts-ignore
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const selectEmoji = (e: { unified: string }) => {
    const sym = e.unified.split("-");
    let codesArray: string[] = [];
    sym.forEach((el: string) => codesArray.push("0x" + el));
    // @ts-ignore
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emoji);
  };

  const showPicker = () => setIsShowPicker(!isShowPicker);

  return (
    <Box sx={{ position: "relative", width: "max-content" }}>
      <Typography
        variant="h2"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          top: "100%",
          zIndex: "9999",
        }}
      >
        <Picker
          theme="auto"
          // @ts-ignore
          onSelect={selectEmoji}
          showPreview={false}
        />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
