import { SelectBasePlotly } from "./selectBase";
import { ToolbarHelper } from "../utils";
import { localization, VisualizationManager } from "..";
export class SelectBaseSortablePlotly extends SelectBasePlotly {
  protected onChartTypeChanged() {
    this.setLabelsOrder("default");
    this.updateOrderSelector();
  }
  private choicesOrder: HTMLDivElement;
  private updateOrderSelector() {
    if (this.chartType == "bar") {
      this.choicesOrder.style.display = "inline-block";
    } else {
      this.choicesOrder.style.display = "none";
      this.choicesOrder.getElementsByTagName("select")[0].value = "default";
    }
  }
  protected createToolbarItems(toolbar: HTMLDivElement) {
    if (this.chartTypes.length > 0) {
      this.choicesOrder = ToolbarHelper.createSelector(
        <HTMLDivElement>toolbar,
        [
          { text: localization.getString("defaultOrder"), value: "default" },
          { text: localization.getString("ascOrder"), value: "asc" },
          { text: localization.getString("descOrder"), value: "desc" }
        ],
        option => false,
        e => {
          this.setLabelsOrder(e.target.value);
          this.update(this.data);
        }
      );
      super.createToolbarItems(toolbar);
      toolbar.appendChild(this.choicesOrder);
    }
  }
}
VisualizationManager.registerVisualizer("checkbox", SelectBaseSortablePlotly);
VisualizationManager.registerVisualizer("radiogroup", SelectBaseSortablePlotly);
VisualizationManager.registerVisualizer("dropdown", SelectBaseSortablePlotly);
VisualizationManager.registerVisualizer("imagepicker", SelectBaseSortablePlotly);
