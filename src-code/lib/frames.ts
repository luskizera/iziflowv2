export namespace Frames {
  export async function createStartNode(nodeData: any): Promise<FrameNode> {
    const frame = figma.createFrame();
    frame.name = (nodeData.name?.trim()) || "Unnamed Node";
    
    frame.layoutMode = "NONE";
    frame.primaryAxisSizingMode = "FIXED";
    frame.counterAxisSizingMode = "FIXED";
    frame.resize(140, 140);
    frame.cornerRadius = 400;

    frame.fills = [{
      type: "SOLID",
      color: hexToRgb("#18181B")
    }];

    const titleText = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    titleText.characters = "START";
    titleText.fontName = { family: "Inter", style: "Bold" };
    titleText.fontSize = 24;
    titleText.fills = [{
      type: "SOLID",
      color: hexToRgb("#FAFAFA")
    }];
    
    frame.appendChild(titleText);
    titleText.x = (frame.width - titleText.width) / 2;
    titleText.y = (frame.height - titleText.height) / 2;

    return frame;
  }

  export async function createEndNode(nodeData: any): Promise<FrameNode> {
    const frame = figma.createFrame();
    frame.name = (nodeData.name?.trim()) || "Unnamed Node";
    
    frame.layoutMode = "NONE";
    frame.primaryAxisSizingMode = "FIXED";
    frame.counterAxisSizingMode = "FIXED";
    frame.resize(140, 140);
    frame.cornerRadius = 400;

    frame.fills = [{
      type: "SOLID",
      color: hexToRgb("#18181B")
    }];

    const titleText = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    titleText.characters = "END";
    titleText.fontName = { family: "Inter", style: "Bold" };
    titleText.fontSize = 24;
    titleText.fills = [{ type: "SOLID", color: hexToRgb("#FAFAFA") }];
    
    frame.appendChild(titleText);
    titleText.x = (frame.width - titleText.width) / 2;
    titleText.y = (frame.height - titleText.height) / 2;

    return frame;
  }

  export async function createStepNode(nodeData: any): Promise<FrameNode> {
    const parentFrame = figma.createFrame();
    parentFrame.name = (nodeData.name?.trim()) || "Unnamed Step";
    
    parentFrame.layoutMode = "VERTICAL";
    parentFrame.primaryAxisSizingMode = "AUTO";
    parentFrame.counterAxisSizingMode = "AUTO";
    parentFrame.itemSpacing = 16;
    parentFrame.fills = [];
    parentFrame.strokes = [];

    // Bloco do título
    const titleBlock = figma.createFrame();
    titleBlock.name = "STEP Title Block";
    titleBlock.layoutMode = "VERTICAL";
    titleBlock.primaryAxisSizingMode = "AUTO";
    titleBlock.counterAxisSizingMode = "FIXED";
    titleBlock.resize(400, titleBlock.height);
    titleBlock.itemSpacing = 8;
    titleBlock.paddingTop = titleBlock.paddingBottom = titleBlock.paddingLeft = titleBlock.paddingRight = 24;
    titleBlock.cornerRadius = 24;
    titleBlock.strokes = [{ type: "SOLID", color: hexToRgb("#A1A1AA") }];
    titleBlock.strokeWeight = 2;
    titleBlock.fills = [{ type: "SOLID", color: hexToRgb("#F4F4F5") }];

    // Chip "STEP"
    const stepChip = await createTypeChip("STEP");
    titleBlock.appendChild(stepChip);

    // Título principal
    const titleText = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    titleText.characters = nodeData.name || "Untitled Step";
    titleText.fontName = { family: "Inter", style: "Semi Bold" };
    titleText.fontSize = 24;
    titleText.fills = [{ type: "SOLID", color: hexToRgb("#09090B") }];
    titleBlock.appendChild(titleText);

    parentFrame.appendChild(titleBlock);

    // Bloco de descrição (se houver)
    if (Array.isArray(nodeData.description) && nodeData.description.length > 0) {
      const descBlock = await createDescriptionBlock(nodeData.description);
      parentFrame.appendChild(descBlock);
    }

    return parentFrame;
  }

  export async function createDecisionNode(nodeData: any): Promise<FrameNode> {
    const frame = figma.createFrame();
    frame.layoutMode = "NONE";
    frame.name = (nodeData.name?.trim()) || "Unnamed Decision";
    frame.resize(300, 200);
    frame.fills = [];
    frame.strokes = [];

    const diamond = figma.createPolygon();
    diamond.pointCount = 4;
    diamond.resize(300, 200);
    diamond.rotation = 0;
    diamond.name = "Diamond Shape";
    diamond.fills = [{ type: "SOLID", color: hexToRgb("#A3A3A3") }];
    
    diamond.x = 0;
    diamond.y = 0;
    frame.appendChild(diamond);

    const textContainer = figma.createFrame();
    textContainer.layoutMode = "NONE";
    textContainer.name = "Decision Text Container";
    textContainer.resize(180, 0);
    textContainer.fills = [];
    textContainer.strokes = [];

    const titleText = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    titleText.characters = nodeData.name || "Untitled Decision";
    titleText.fontName = { family: "Inter", style: "Semi Bold" };
    titleText.fontSize = 18;
    titleText.fills = [{ type: "SOLID", color: hexToRgb("#FFFFFF") }];
    textContainer.appendChild(titleText);

    textContainer.resize(180, titleText.height);
    textContainer.x = (300 - textContainer.width) / 2;
    textContainer.y = (200 - textContainer.height) / 2;
    frame.appendChild(textContainer);

    return frame;
  }

  // Métodos auxiliares privados
  async function createTypeChip(text: string): Promise<FrameNode> {
    const chip = figma.createFrame();
    chip.name = "TypeChip";
    chip.layoutMode = "HORIZONTAL";
    chip.primaryAxisSizingMode = chip.counterAxisSizingMode = "AUTO";
    chip.paddingTop = chip.paddingBottom = 2;
    chip.paddingLeft = chip.paddingRight = 16;
    chip.cornerRadius = 8;
    chip.fills = [{ type: "SOLID", color: hexToRgb("#18181B") }];

    const chipText = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    chipText.characters = text;
    chipText.fontName = { family: "Inter", style: "Semi Bold" };
    chipText.fontSize = 14;
    chipText.fills = [{ type: "SOLID", color: hexToRgb("#FAFAFA") }];
    chip.appendChild(chipText);

    return chip;
  }

  async function createDescriptionBlock(descriptions: any[]): Promise<FrameNode> {
    const block = figma.createFrame();
    block.name = "Description Block";
    block.layoutMode = "VERTICAL";
    block.primaryAxisSizingMode = "AUTO";
    block.counterAxisSizingMode = "FIXED";
    block.resize(400, block.height);
    block.itemSpacing = 8;
    block.paddingTop = block.paddingBottom = block.paddingLeft = block.paddingRight = 24;
    block.cornerRadius = 24;
    block.strokes = [{ type: "SOLID", color: hexToRgb("#E4E4E7") }];
    block.strokeWeight = 2;
    block.fills = [{ type: "SOLID", color: hexToRgb("#FFFFFF") }];

    for (const desc of descriptions) {
      const itemFrame = await createDescriptionItem(desc);
      block.appendChild(itemFrame);
    }

    return block;
  }

  async function createDescriptionItem(desc: any): Promise<FrameNode> {
    const frame = figma.createFrame();
    frame.name = desc.label || "Description Item";
    frame.layoutMode = "VERTICAL";
    frame.layoutAlign = "STRETCH";
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "AUTO";
    frame.itemSpacing = 8;
    frame.paddingBottom = 24;

    if (desc.label) {
      const labelChip = await createTypeChip(desc.label.toUpperCase());
      frame.appendChild(labelChip);
    }

    if (desc.content) {
      const content = figma.createText();
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      content.characters = desc.content;
      content.fontName = { family: "Inter", style: "Regular" };
      content.fontSize = 18;
      frame.appendChild(content);
    }

    return frame;
  }

  function hexToRgb(hex: string) {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    return { r, g, b };
  }
}
