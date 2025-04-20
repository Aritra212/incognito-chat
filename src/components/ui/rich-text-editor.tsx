"use client";

import { IChatData } from "@/common/common.interface";
import { EditorContent, useEditor, BubbleMenu, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Bold, Italic, UnderlineIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { MdOutlineFormatColorText } from "react-icons/md";

type Props = {
  onValueChange?: (value: string) => void;
  formData?: IChatData;
  content?: string;
  readOnly?: boolean;
  className?: string;
  readOnlyContent?: string;
  editorClassName?: string;
};

type MenuButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const TextColorOptions = {
  colors: [
    { name: "White", color: "rgb(242, 244, 255)" },
    { name: "Green", color: "rgb(93, 214, 44)" },
    { name: "Red", color: "rgb(255, 70, 46)" },
    { name: "Yellow", color: "rgb(231, 254, 86)" },
  ],
} as const;

const MenuButton = ({ isActive, onClick, children }: MenuButtonProps) => {
  return (
    <Button
      size="sm"
      type={"button"}
      variant={"ghost"}
      className={cn(
        "h-8 w-8 p-1.5 text-foreground hover:text-foreground hover:bg-input/40 [&_svg]:size-5",
        isActive && "border-2 border-white/40"
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

type ColorButtonProps = {
  editor: Editor;
  color: string;
  isActive: boolean;
  onSelect: () => void;
};

const ColorButton = ({
  editor,
  color,
  isActive,
  onSelect,
}: ColorButtonProps) => {
  return (
    <Button
      type="button"
      size={"sm"}
      variant={"ghost"}
      className={cn(
        "h-6 w-6 p-0.5 hover:bg-transparent",
        isActive &&
          "ring-1 ring-white/60 ring-offset-1 ring-offset-popover rounded-full"
      )}
      onClick={() => {
        editor.chain().focus().setColor(color).run();
        onSelect();
      }}
    >
      <div
        className="rounded-full w-full h-full"
        style={{ backgroundColor: color }}
      />
    </Button>
  );
};

export default function RichTextEditor({
  onValueChange,
  formData,
  content,
  readOnly = false,
  className,
  readOnlyContent,
  editorClassName,
}: Props) {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const DEFAULT_COLOR = TextColorOptions.colors[0].color;

  const editor = useEditor(
    {
      extensions: [StarterKit, TextStyle, Color, Underline, Link],
      immediatelyRender: false,
      editable: !readOnly,
      content: content ?? formData?.message,
      onUpdate: ({ editor }) => {
        onValueChange?.(editor.getHTML());
      },

      editorProps: {
        transformPastedText(text) {
          return text;
        },
      },
    },
    [readOnlyContent]
  );

  if (!editor) return null;

  const handleContainerClick = () => {
    if (readOnly) return;

    if (editor && !editor.isFocused && !isBubbleMenuOpen)
      editor.commands.focus("end");
  };

  const getCurrentColor = () => {
    const color = editor.getAttributes("textStyle").color;
    return (
      TextColorOptions.colors.find((c) => c.color === color)?.color ||
      DEFAULT_COLOR
    );
  };

  return (
    <div
      className={cn(
        "relative bg-popover/40 disabled:opacity-50 shadow-sm backdrop-blur-[128px] rounded-xl focus-visible:ring-1 focus-visible:ring-ring min-h-96 text-sm placeholder:text-muted-foreground transition-colors focus-visible:outline-none disabled:cursor-not-allowed w-full overflow-x-auto",
        readOnly && "bg-popover/30",
        className
      )}
      onClick={handleContainerClick}
    >
      {editor && (
        <BubbleMenu
          className="flex items-center gap-2 bg-popover shadow-lg px-3 py-2 rounded-xl"
          tippyOptions={{
            duration: 100,
            placement: "auto",
            onShow: () => setIsBubbleMenuOpen(true),
            onHide: () => setIsBubbleMenuOpen(false),
          }}
          editor={editor}
        >
          <div className="flex items-center gap-2">
            <MenuButton
              isActive={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold />
            </MenuButton>
            <MenuButton
              isActive={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Italic />
            </MenuButton>
            <MenuButton
              isActive={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <UnderlineIcon />
            </MenuButton>

            <Popover open={isColorOpen} onOpenChange={setIsColorOpen}>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  type={"button"}
                  className={cn(
                    "px-2 py-1.5 hover:bg-input/40 [&_svg]:size-5",
                    isColorOpen && "bg-input/40"
                  )}
                  style={{
                    color: getCurrentColor(),
                  }}
                >
                  <MdOutlineFormatColorText />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="backdrop-blur-3xl px-3 py-2 rounded-xl w-fit"
                sideOffset={15}
                align="start"
                side="top"
              >
                <div className="flex items-center gap-2">
                  {TextColorOptions.colors.map((colorOption) => (
                    <ColorButton
                      key={colorOption.color}
                      editor={editor}
                      color={colorOption.color}
                      isActive={editor.isActive("textStyle", {
                        color: colorOption.color,
                      })}
                      onSelect={() => setIsColorOpen(false)}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </BubbleMenu>
      )}

      <EditorContent
        editor={editor}
        className={cn("p-4 border-none max-w-none prose", editorClassName)}
      />
    </div>
  );
}
