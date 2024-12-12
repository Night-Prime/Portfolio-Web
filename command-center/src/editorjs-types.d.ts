declare module '@editorjs/header' {
    import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';
    export default class Header implements BlockTool {
        constructor(config?: BlockToolConstructorOptions);
    }
}

declare module '@editorjs/list' {
    import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';
    export default class List implements BlockTool {
        constructor(config?: BlockToolConstructorOptions);
    }
}

declare module '@editorjs/quote' {
    import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';
    export default class Quote implements BlockTool {
        constructor(config?: BlockToolConstructorOptions);
    }
}

declare module '@editorjs/code' {
    import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';
    export default class CodeTool implements BlockTool {
        constructor(config?: BlockToolConstructorOptions);
    }
}

declare module '@editorjs/link' {
    import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';
    export default class LinkTool implements BlockTool {
        constructor(config?: BlockToolConstructorOptions);
    }
}

declare module '@editorjs/image' {
    import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';
    export default class ImageTool implements BlockTool {
        constructor(config?: BlockToolConstructorOptions);
    }
}