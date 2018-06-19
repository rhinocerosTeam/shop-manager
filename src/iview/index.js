/**
 * Created by songpeilan on 2018/6/18.
 */

import { Card, Button, Table, Menu, Row, Col, Icon, Input, Select, Option, Form, Modal, MenuItem, MenuGroup, Submenu, Tabs, TabPane, Radio, RadioGroup} from 'iview';

const iview = {
  install: function (Vue) {
    Vue.component('Card', Card);
    Vue.component('Button', Button);
    Vue.component('Table', Table);
    Vue.component('Menu', Menu);
    Vue.component('Submenu', Submenu);
    Vue.component('MenuGroup', MenuGroup);
    Vue.component('MenuItem', MenuItem);
    Vue.component('Row', Row);
    Vue.component('Col', Col);
    Vue.component('Icon', Icon);
    Vue.component('Input', Input);
    Vue.component('Select', Select);
    Vue.component('Option', Option);
    Vue.component('Modal', Modal);
    Vue.component('Tabs', Tabs);
    Vue.component('TabPane', TabPane);
    Vue.component('Radio', Radio);
    Vue.component('RadioGroup', RadioGroup)
  }
}

export default iview
