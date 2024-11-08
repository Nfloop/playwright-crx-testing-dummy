

import { CallMetadata } from "@protocol/callMetadata";
import { ActionInContext } from "@recorder/actions";
import { Source } from "@recorder/recorderTypes";
import { CSharpLanguageGenerator } from "playwright-core/lib/server/codegen/csharp";
import { JavaLanguageGenerator } from "playwright-core/lib/server/codegen/java";
import { JavaScriptLanguageGenerator } from "playwright-core/lib/server/codegen/javascript";
import { PythonLanguageGenerator } from "playwright-core/lib/server/codegen/python";
import { Language, LanguageGeneratorOptions } from "playwright-core/lib/server/codegen/types";
import { monotonicTime } from "playwright-core/lib/utils";

export type Location = CallMetadata['location'];
export type ActionInContextWithLocation = ActionInContext & { location?: Location };

export type Script = {
  filename: string;
  language?: Language;
  header: LanguageGeneratorOptions;
  actions: ActionInContextWithLocation[];
}

const languages = new Map([
  new JavaLanguageGenerator('junit'),
  new JavaLanguageGenerator('library'),
  new JavaScriptLanguageGenerator(/* isPlaywrightTest */false),
  new JavaScriptLanguageGenerator(/* isPlaywrightTest */true),
  new PythonLanguageGenerator(/* isAsync */false, /* isPytest */true),
  new PythonLanguageGenerator(/* isAsync */false, /* isPytest */false),
  new PythonLanguageGenerator(/* isAsync */true,  /* isPytest */false),
  new CSharpLanguageGenerator('mstest'),
  new CSharpLanguageGenerator('nunit'),
  new CSharpLanguageGenerator('library'),
].map(gen => [gen.id, gen]));

export function toSource(script: Script): Source {
  const langGenerator = languages.get(script.language ?? script.filename) ?? languages.get('javascript')!;
  const header = langGenerator.generateHeader(script.header);
  const footer = langGenerator.generateFooter(undefined);
  const actions = script.actions.map(({ frame, action }) => {
    const actionInContext: ActionInContext = {
      action,
      frame,
      startTime: monotonicTime()
    }
    return langGenerator.generateAction(actionInContext);
  });
  const text = [header, ...actions, footer].filter(Boolean).join('\n');

  return {
    isRecorded: false,
    id: script.filename,
    label: script.filename,
    text,
    language: langGenerator.highlighter,
    highlight: [],
    // used to group the language generators
    group: 'Scripts',
    header,
    footer,
    actions,
  };
}
