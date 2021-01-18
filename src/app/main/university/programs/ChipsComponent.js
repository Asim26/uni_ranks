import React, { Component } from 'react';
import TagBox from 'devextreme-react/tag-box';
import ArrayStore from 'devextreme/data/array_store';

export default class ChipsComponent extends Component {
  constructor(props) {
    super(props);
    this.onValueChanged = this.onValueChanged.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.products = new ArrayStore({
      data: this.props.data.column.lookup.items,
      key: 'id'
    });
  }

  onValueChanged(e) {
    this.props.data.setValue(e.value);

  }

  onSelectionChanged() {
    this.props.data.component.updateDimensions();
  }

  render() {
    return <TagBox
      className="mt-16"
      dataSource={this.products}
      defaultValue={this.props.data.value}
      valueExpr="id"
      displayExpr="spec_name"
      showSelectionControls={false}
      maxDisplayedTags={10}
      showMultiTagOnly={false}
      applyValueMode="immediately"
      searchEnabled={false}
      onValueChanged={this.onValueChanged}
      onSelectionChanged={this.onSelectionChanged}
      />;
  }
}
