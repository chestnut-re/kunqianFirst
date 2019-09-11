import {
    FC_S_URL,
    LBTX_S_URL,
    YLSC_S_URL,
    GZ_S_URL,
    MXXL_S_URL,
    YYYS_S_URL,
    MXCS_S_URL,
    TPGN_S_URL,
    STXX_S_URL,
    GXWJL_S_URL,
    SH_S_URL,
    WDHC_S_URL,
    SS_S_URL, SXSB_S_URL, YBGJ_S_URL,
} from '../../Icon/Icon';
import { PROJECT } from "../Config"
export default class CustomContextPad {
    constructor(bpmnFactory, config, contextPad, create, elementFactory, injector, translate) {
        this.bpmnFactory = bpmnFactory;
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;

        if (config.autoPlace !== false) {
            this.autoPlace = injector.get('autoPlace', false);
        }

        contextPad.registerProvider(this);
    }

    getContextPadEntries(element) {
        const {
            autoPlace,
            bpmnFactory,
            create,
            elementFactory,
            translate
        } = this;

        function appendServiceTask(suitabilityScore) {
            return function(event, element) {
                if (autoPlace) {
                    const businessObject = bpmnFactory.create('bpmn:UserTask');

                    businessObject.formKey = suitabilityScore;

                    const shape = elementFactory.createShape({
                        type: 'bpmn:UserTask',
                        businessObject: businessObject
                    });

                    autoPlace.append(element, shape);
                } else {
                    appendServiceTaskStart(event, element);
                }
            }
        }

        function appendServiceTaskStart(suitabilityScore) {
            return function(event) {
                const businessObject = bpmnFactory.create('bpmn:UserTask');

                businessObject.formKey = suitabilityScore;

                const shape = elementFactory.createShape({
                    type: 'bpmn:UserTask',
                    businessObject: businessObject
                });

                create.start(event, shape, element);
            }
        }

        return {
            'append.fc-task': {
                group: 'model',
                imageUrl: FC_S_URL,
                title: translate(PROJECT.FC_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.FC_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.FC_NAME)
                }
            },
            'append.lbtx-task': {
                group: 'model',
                imageUrl: LBTX_S_URL,
                title: translate(PROJECT.LBTX_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.LBTX_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.LBTX_NAME)
                }
            },
            'append.ylsc-task': {
                group: 'model',
                imageUrl: YLSC_S_URL,
                title: translate(PROJECT.YLSC_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.YLSC_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.YLSC_NAME)
                }
            },
            'append.gzjl-task': {
                group: 'model',
                imageUrl: GZ_S_URL,
                title: translate(PROJECT.GZJL_EN_MAME),
                action: {
                    click: appendServiceTask(PROJECT.GZJL_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.GZJL_NAME)
                }
            },
            'append.mxxl-task': {
                group: 'model',
                imageUrl: MXXL_S_URL,
                title: translate(PROJECT.MXXL_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.MXXL_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.MXXL_NAME)
                }
            },
            'append.yyys-task': {
                group: 'model',
                imageUrl: YYYS_S_URL,
                title: translate(PROJECT.YYYS_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.YYYS_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.YYYS_NAME)
                }
            },
            'append.mxcs-task': {
                group: 'model',
                imageUrl: MXCS_S_URL,
                title: translate(PROJECT.MXCS_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.MXCS_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.MXCS_NAME)
                }
            },
            'append.tpgn-task': {
                group: 'model',
                imageUrl: TPGN_S_URL,
                title: translate(PROJECT.TPGN_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.TPGN_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.TPGN_NAME)
                }
            },
            'append.stjl-task': {
                group: 'model',
                imageUrl: STXX_S_URL,
                title: translate(PROJECT.STXX_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.STXX_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.STXX_NAME)
                }
            },
            'append.gxwjl-task': {
                group: 'model',
                imageUrl: GXWJL_S_URL,
                title: translate(PROJECT.GXWJL_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.GXWJL_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.GXWJL_NAME)
                }
            },
            'append.sh-task': {
                group: 'model',
                imageUrl: GXWJL_S_URL,
                title: translate(PROJECT.SH_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.SH_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.SH_NAME)
                }
            },
            'append.wdhc-task': {
                group: 'model',
                imageUrl: WDHC_S_URL,
                title: translate(PROJECT.WDHC_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.WDHC_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.WDHC_NAME)
                }
            },
            'append.ss-task': {
                group: 'model',
                imageUrl: SS_S_URL,
                title: translate(PROJECT.SS_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.SS_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.SS_NAME)
                }
            },
            'append.sxsb-task': {
                group: 'model',
                imageUrl: SXSB_S_URL,
                title: translate(PROJECT.SXSB_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.SXSB_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.SXSB_NAME)
                }
            },
            'append.ybgj-task': {
                group: 'model',
                imageUrl: YBGJ_S_URL,
                title: translate(PROJECT.YBGJ_EN_NAME),
                action: {
                    click: appendServiceTask(PROJECT.YBGJ_NAME),
                    dragstart: appendServiceTaskStart(PROJECT.YBGJ_NAME)
                }
            },
        };
    }
}

CustomContextPad.$inject = [
    'bpmnFactory',
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
];