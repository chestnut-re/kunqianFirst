import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { PROJECT } from "../Config"
import {
    append as svgAppend,
    attr as svgAttr,
    classes as svgClasses,
    create as svgCreate
} from 'tiny-svg';

import {
    getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
    is,
    getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import { isNil } from 'min-dash';
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
    SXSB_ICON_URL,
    YBGJ_ICON_URL
} from "../../Icon/Icon";

const HIGH_PRIORITY = 1500,
    TASK_BORDER_RADIUS = 2,
    COLOR_GREEN = '#52B415',
    COLOR_YELLOW = '#ffc800',
    COLOR_RED = '#cc0000';


export default class CustomRenderer extends BaseRenderer {
    constructor(eventBus, bpmnRenderer) {
        super(eventBus, HIGH_PRIORITY);

        this.bpmnRenderer = bpmnRenderer;
    }

    canRender(element) {

        // ignore labels
        return !element.labelTarget;
    }

    drawShape(parentNode, element) {
        const shape = this.bpmnRenderer.drawShape(parentNode, element);
        let prointFlag = element.businessObject.formKey;
        console.log(parentNode);
        const suitabilityScore = this.getSuitabilityScore(element);
        // 分词
        if (prointFlag === PROJECT.FC_NAME) {
            element.data = PROJECT.FC_NAME+"_"+new Date().getTime();
            element.name = PROJECT.FC_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: FC_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.FC_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 类别体系
        } else if (prointFlag === PROJECT.LBTX_NAME) {
            element.data = PROJECT.LBTX_NAME+"_"+new Date().getTime();
            element.name = PROJECT.LBTX_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: LBTX_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.LBTX_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 语料生成
        } else if (prointFlag === PROJECT.YLSC_NAME) {
            element.data = PROJECT.YLSC_NAME+"_"+new Date().getTime();
            element.name = PROJECT.YLSC_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: YLSC_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.YLSC_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        //规则建立
        } else if (prointFlag === PROJECT.GZJL_NAME) {
            element.data = PROJECT.GZJL_NAME+"_"+new Date().getTime();
            element.name = PROJECT.GZJL_EN_MAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: GZ_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.GZJL_EN_MAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 模型训练
        }else if (prointFlag === PROJECT.MXXL_NAME) {
            element.data = PROJECT.MXXL_NAME+"_"+new Date().getTime();
            element.name = PROJECT.MXXL_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: MXXL_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.MXXL_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 应用运算
        }else if (prointFlag === PROJECT.YYYS_NAME) {
            element.data = PROJECT.YYYS_NAME+"_"+new Date().getTime();
            element.name = PROJECT.YYYS_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: YYYS_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.YYYS_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 模型测试
        }else if (prointFlag === PROJECT.MXCS_NAME) {
            element.data = PROJECT.MXCS_NAME+"_"+new Date().getTime();
            element.name = PROJECT.MXCS_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: MXCS_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.MXCS_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 图谱概念
        }else if (prointFlag === PROJECT.TPGN_NAME) {
            element.data = PROJECT.TPGN_NAME+"_"+new Date().getTime();
            element.name = PROJECT.TPGN_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: TPGN_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.TPGN_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 实体信息
        }else if (prointFlag === PROJECT.STXX_NAME) {
            element.data = PROJECT.STXX_NAME+"_"+new Date().getTime();
            element.name = PROJECT.STXX_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: STXX_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.STXX_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 关系网建立
        }else if (prointFlag === PROJECT.GXWJL_NAME) {
            element.data = PROJECT.GXWJL_NAME+"_"+new Date().getTime();
            element.name = PROJECT.GXWJL_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: GXWJL_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.GXWJL_EN_NAME;
            tsSpan.setAttribute("x", 20);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 审核
        }else if (prointFlag === PROJECT.SH_NAME) {
            element.data = PROJECT.SH_NAME+"_"+new Date().getTime();
            element.name = PROJECT.SH_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: SH_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.SH_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 文档合成
        }else if (prointFlag === PROJECT.WDHC_NAME) {
            element.data = PROJECT.WDHC_NAME+"_"+new Date().getTime();
            element.name = PROJECT.WDHC_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: WDHC_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.WDHC_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 搜索
        }else if (prointFlag === PROJECT.SS_NAME) {
            element.data = PROJECT.SS_NAME+"_"+new Date().getTime();
            element.name = PROJECT.SS_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: SS_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.SS_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        //属性定义
        }else if (prointFlag === PROJECT.SXSB_NAME) {
            element.data = PROJECT.SXSB_NAME+"_"+new Date().getTime();
            element.name = PROJECT.SXSB_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: SXSB_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.SXSB_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        // 样本构建
        }else if (prointFlag === PROJECT.YBGJ_NAME) {
            element.data = PROJECT.YBGJ_NAME+"_"+new Date().getTime();
            element.name = PROJECT.YBGJ_EN_NAME;
            let iconGfx = svgCreate('image', {
                x: 70,
                y: 0,
                width: 25,
                height: 25,
                href: YBGJ_ICON_URL,
            });
            let tsSpan = parentNode.getElementsByTagName("tspan")[0];
            tsSpan.innerHTML= PROJECT.YBGJ_EN_NAME;
            tsSpan.setAttribute("x", 28);
            svgAppend(parentNode,iconGfx);
            return shape;
        }
    }

    getShapePath(shape) {
        if (is(shape, 'bpmn:Task')) {
            return getRoundRectPath(shape, TASK_BORDER_RADIUS);
        }

        return this.bpmnRenderer.getShapePath(shape);
    }

    getSuitabilityScore(element) {
        const businessObject = getBusinessObject(element);

        const { formKey } = businessObject;

        return Number.isFinite(formKey) ? formKey : null;
    }

    getColor(suitabilityScore) {
        if (suitabilityScore > 75) {
            return COLOR_GREEN;
        } else if (suitabilityScore > 25) {
            return COLOR_YELLOW;
        }

        return COLOR_RED;
    }
}

CustomRenderer.$inject = [ 'eventBus', 'bpmnRenderer' ];

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, color) {
    const rect = svgCreate('rect');

    svgAttr(rect, {
        width: width,
        height: height,
        rx: borderRadius,
        ry: borderRadius,
        stroke: color,
        strokeWidth: 2,
        fill: color
    });

    svgAppend(parentNode, rect);

    return rect;
}