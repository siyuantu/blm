import CMS from 'netlify-cms-app';

import IndexPagePreview from './preview-templates/IndexPagePreview';
import TalkingPointsPreview from './preview-templates/TalkingPointsPreview';

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('talking_points', TalkingPointsPreview);
