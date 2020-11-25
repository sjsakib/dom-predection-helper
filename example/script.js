import "./source";
import DomPredictionHelper from "../app";
import OldDomPredictionHelper from '../app/old';

import titles from './groups/first-title';
import comments from './groups/first-comments';
import benchmark from './benchmark';
import { select } from "optimal-select";
import jQuery from 'jquery';

// expose basic required functions
// window.jQuery = jQuery;
// window.$ = jQuery;
window.DomPredictionHelper = DomPredictionHelper;

// expose an instance for live experiments
const helper = new DomPredictionHelper();
window.helper = helper;

const oldHelper = new OldDomPredictionHelper();

console.info(
  "jQuery, $, DomPredictionHelper and helper is available on this scope."
);

// optimal-select is optional
// this is for demonstration purpose only.
window.select = select;
titles(select, helper);
comments(select, helper);
console.groupEnd();

benchmark(select, helper, oldHelper, jQuery);
