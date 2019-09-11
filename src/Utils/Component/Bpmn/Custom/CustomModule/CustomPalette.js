import {
    FC_ICON_URL,
    LBTX_ICON_URL,
    YLSC_ICON_URL,
    GZ_ICON_URL,
    MXXL_ICON_URL,
    YYYS_ICON_URL,
    MXCS_ICON_URL,
    TPGN_ICON_URL,
    STXX_ICON_URL,
    GXWJL_ICON_URL,
    SH_ICON_URL,
    WDHC_ICON_URL,
    SS_ICON_URL,
    SXSB_ICON_URL, YBGJ_ICON_URL,
} from '../../Icon/Icon';
import { PROJECT } from "../Config"
const SUITABILITY_SCORE_HIGH = 100,
    SUITABILITY_SCORE_AVERGE = 50,
    SUITABILITY_SCORE_LOW = 25;
export default class CustomPalette {
    constructor(bpmnFactory, create, elementFactory, palette, translate) {
        this.bpmnFactory = bpmnFactory;
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;

        palette.registerProvider(this);
    }

    getPaletteEntries(element) {
        const {
            bpmnFactory,
            create,
            elementFactory,
            translate
        } = this;

        function createTask(suitabilityScore) {
            return function(event) {
                const businessObject = bpmnFactory.create('bpmn:UserTask');

                businessObject.formKey = suitabilityScore;

                const shape = elementFactory.createShape({
                    type: 'bpmn:UserTask',
                    businessObject: businessObject
                });

                create.start(event, shape);
            }
        }

        return {
            'create.fc-task': {
                group: 'custom',
                imageUrl: FC_ICON_URL,
                title: translate(PROJECT.FC_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.FC_NAME),
                    click: createTask(PROJECT.FC_NAME)
                }
            },
            'create.lbtx-task': {
                group: 'custom',
                imageUrl: LBTX_ICON_URL,
                title: translate(PROJECT.LBTX_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.LBTX_NAME),
                    click: createTask(PROJECT.LBTX_NAME)
                }
            },
            'create.ylsc-task': {
                group: 'custom',
                imageUrl:YLSC_ICON_URL,
                title: translate(PROJECT.YLSC_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.YLSC_NAME),
                    click: createTask(PROJECT.YLSC_NAME)
                }
            },
            'create.gzjl-task': {
                group: 'custom',
                imageUrl:GZ_ICON_URL,
                title: translate(PROJECT.GZJL_EN_MAME),
                action: {
                    dragstart: createTask(PROJECT.GZJL_NAME),
                    click: createTask(PROJECT.GZJL_NAME)
                }
            },
            'create.mxxl-task': {
                group: 'custom',
                imageUrl:MXXL_ICON_URL,
                title: translate(PROJECT.MXXL_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.MXXL_NAME),
                    click: createTask(PROJECT.MXXL_NAME)
                }
            },
            'create.yyys-task': {
                group: 'custom',
                imageUrl:YYYS_ICON_URL,
                title: translate(PROJECT.YYYS_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.YYYS_NAME),
                    click: createTask(PROJECT.YYYS_NAME)
                }
            },
            'create.mxcs-task': {
                group: 'custom',
                imageUrl:MXCS_ICON_URL,
                title: translate(PROJECT.MXCS_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.MXCS_NAME),
                    click: createTask(PROJECT.MXCS_NAME)
                }
            },
            'create.tpgn-task': {
                group: 'custom',
                imageUrl:TPGN_ICON_URL,
                title: translate(PROJECT.TPGN_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.TPGN_NAME),
                    click: createTask(PROJECT.TPGN_NAME)
                }
            },
            'create.stjl-task': {
                group: 'custom',
                imageUrl:STXX_ICON_URL,
                title: translate(PROJECT.STXX_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.STXX_NAME),
                    click: createTask(PROJECT.STXX_NAME)
                }
            },
            'create.gxwjl-task': {
                group: 'custom',
                imageUrl:GXWJL_ICON_URL,
                title: translate(PROJECT.GXWJL_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.GXWJL_NAME),
                    click: createTask(PROJECT.GXWJL_NAME)
                }
            },
            'create.sh-task': {
                group: 'custom',
                imageUrl:SH_ICON_URL,
                title: translate(PROJECT.SH_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.SH_NAME),
                    click: createTask(PROJECT.SH_NAME)
                }
            },
            'create.wdhc-task': {
                group: 'custom',
                imageUrl:WDHC_ICON_URL,
                title: translate(PROJECT.WDHC_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.WDHC_NAME),
                    click: createTask(PROJECT.WDHC_NAME)
                }
            },
            'create.ss-task': {
                group: 'custom',
                imageUrl:SS_ICON_URL,
                title: translate(PROJECT.SS_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.SS_NAME),
                    click: createTask(PROJECT.SS_NAME)
                }
            },
            'create.sxsb-task': {
                group: 'custom',
                imageUrl:SXSB_ICON_URL,
                title: translate(PROJECT.SXSB_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.SXSB_NAME),
                    click: createTask(PROJECT.SXSB_NAME)
                }
            },
            'create.ybgj-task': {
                group: 'custom',
                imageUrl:YBGJ_ICON_URL,
                title: translate(PROJECT.YBGJ_EN_NAME),
                action: {
                    dragstart: createTask(PROJECT.YBGJ_NAME),
                    click: createTask(PROJECT.YBGJ_NAME)
                }
            },
        }
    }
}

CustomPalette.$inject = [
    'bpmnFactory',
    'create',
    'elementFactory',
    'palette',
    'translate'
];