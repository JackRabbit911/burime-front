import Range from "reused/Range"
import FileInput from "reused/FileInput"
import ColorPicker from "reused/ColorPicker"
import { useTranslate } from "common/i18n/hooks"

const CoverControls = () => {
  const __ = useTranslate()

  return (
    <fieldset className="fieldset md:col-span-2">
      <legend className="fieldset-legend mb-3">
        {__('Choose colors')}
      </legend>
      <div className="flex flex-row justify-around">
        <ColorPicker
          fieldName="branch.cover.bg_color"
          label={__('Background')}
        />
        <ColorPicker
          fieldName="branch.cover.text_color"
          label={__('Text')}
        />
      </div>
      <Range
        fieldName="branch.cover.text_size"
        label={__('Font size')}
        min={5}
        max={50}
        step={1}
      />
      <div className="divider mt-8 mb-4 text-lg text-current/75">or</div>
        <FileInput
          fieldName="cover"
          label={__('Cover image')}
          optional="Up to 2Mb"
        />
        <FileInput
          fieldName="bgImg"
          label={__('Background image')}
          optional="Up to 2Mb"
        />
    </fieldset>
  )
}

export default CoverControls
