import EH2005 from '../../../../../../resources/images/EH2005.png'
import EH2006 from '../../../../../../resources/images/EH2006.png'
import EH2008 from '../../../../../../resources/images/EH2008.png'
import EH2304 from '../../../../../../resources/images/EH2304.png'
import EH2305 from '../../../../../../resources/images/EH2305.png'
import EH2306 from '../../../../../../resources/images/EH2306.png'
import EH2308 from '../../../../../../resources/images/EH2308.png'
import EH2316 from '../../../../../../resources/images/EH2316.png'
import EH7506 from '../../../../../../resources/images/EH7506.png'
import EH7508 from '../../../../../../resources/images/EH7508.png'
import EH7512 from '../../../../../../resources/images/EH7512.png'
import EH7520 from '../../../../../../resources/images/EH7520.png'
import EHG2008 from '../../../../../../resources/images/EHG2008.png'
import EHG2308 from '../../../../../../resources/images/EHG2308.png'
import EHG2408 from '../../../../../../resources/images/EHG2408.png'
import EHG6408 from '../../../../../../resources/images/EHG6408.png'
import EHG6410 from '../../../../../../resources/images/EHG6410.png'
import EHG7305 from '../../../../../../resources/images/EHG7305.png'
import EHG7306 from '../../../../../../resources/images/EHG7306.png'
import EHG7307 from '../../../../../../resources/images/EHG7307.png'
import EHG7504 from '../../../../../../resources/images/EHG7504.png'
import EHG7508 from '../../../../../../resources/images/EHG7508.png'
import EHG7512 from '../../../../../../resources/images/EHG7512.png'
import EHG7516 from '../../../../../../resources/images/EHG7516.png'
import EHG7520 from '../../../../../../resources/images/EHG7520.png'
import EHG7604 from '../../../../../../resources/images/EHG7604.png'
import EHG7608 from '../../../../../../resources/images/EHG7608.png'
import EHG7612 from '../../../../../../resources/images/EHG7612.png'
import EHG7616 from '../../../../../../resources/images/EHG7616.png'
import EHG7620 from '../../../../../../resources/images/EHG7620.png'
import EHG9508 from '../../../../../../resources/images/EHG9508.png'
import EHG9512 from '../../../../../../resources/images/EHG9512.png'
import EMG8305 from '../../../../../../resources/images/EMG8305.png'
import EMG8508 from '../../../../../../resources/images/EMG8508.png'
import EMG8510 from '../../../../../../resources/images/EMG8510.png'
import EH3305 from '../../../../../../resources/images/EH3305.png'
import EHG3305 from '../../../../../../resources/images/EHG3305.png'
import ESASWITCHICON from '../../../../../../resources/images/ESASWITCHICON.png'
import CGS2520 from '../../../../../../resources/images/Cisco_CGS2520.jpg'
import unknow from '../../../../../../resources/images/unknow.png'
const TopologyImage = (model) => {
  let modelId = ''
  if (model.indexOf('-') > 0) modelId = model.substring(0, model.indexOf('-'))
  else modelId = model
  switch (modelId) {
    case 'EH2005':
      return EH2005
    case 'EH2006':
      return EH2006
    case 'EH2008':
      return EH2008
    case 'EH2304':
      return EH2304
    case 'EH2305':
      return EH2305
    case 'EH2306':
      return EH2306
    case 'EH2308':
      return EH2308
    case 'EH2316':
      return EH2316
    case 'EH7506':
      return EH7506
    case 'EH7508':
      return EH7508
    case 'EH7512':
      return EH7512
    case 'EH7520':
      return EH7520
    case 'EHG2008':
      return EHG2008
    case 'EHG2308':
      return EHG2308
    case 'EHG2408':
      return EHG2408
    case 'EHG6408':
      return EHG6408
    case 'EHG6410':
      return EHG6410
    case 'EHG7305':
      return EHG7305
    case 'EHG7306':
      return EHG7306
    case 'EHG7307':
      return EHG7307
    case 'EHG7504':
      return EHG7504
    case 'EHG7508':
      return EHG7508
    case 'EHG7512':
      return EHG7512
    case 'EHG7516':
      return EHG7516
    case 'EHG7520':
      return EHG7520
    case 'EHG7604':
      return EHG7604
    case 'EHG7608':
      return EHG7608
    case 'EHG7612':
      return EHG7612
    case 'EHG7616':
      return EHG7616
    case 'EHG7620':
      return EHG7620
    case 'EHG9508':
      return EHG9508
    case 'EHG9512':
      return EHG9512
    case 'EMG8305':
      return EMG8305
    case 'EMG8508':
      return EMG8508
    case 'EMG8510':
      return EMG8510
    case 'EH3305':
      return EH3305
    case 'EHG3305':
      return EHG3305
    case 'HIDRA05U000000X':
      return ESASWITCHICON
    case 'HIDRA05UG50000X':
      return ESASWITCHICON
    case 'HIDRA05UG50000A':
      return ESASWITCHICON
    case 'HIDRA05UG500007':
      return ESASWITCHICON
    case 'HIDRA08U000000X':
      return ESASWITCHICON
    case 'HIDRA08UG80000X':
      return ESASWITCHICON
    case 'HIDRA16UG20000X':
      return ESASWITCHICON
    case 'HIDRA08UG8P800V':
      return ESASWITCHICON
    case 'HIDRA08MG8P4F4X':
      return ESASWITCHICON
    case 'HIDRA08MG8P800X':
      return ESASWITCHICON
    case 'HIDRA08MG80000X':
      return ESASWITCHICON
    case 'HIDRA083G80000X':
      return ESASWITCHICON
    case 'HIDRA08MG800007':
      return ESASWITCHICON
    case 'Cisco CGS2520':
      return CGS2520
    default:
      return unknow
  }
}

export { TopologyImage }
