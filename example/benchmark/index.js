import benchmark from 'benchmark';
import _ from 'lodash';
import process from 'process';

const Benchmark = benchmark.runInContext({ _, process });
window.Benchmark = Benchmark;

export default function benchmarkHelper(select, helper, oldHelper, jQuery) {
  const suite = new Benchmark.Suite();

  const firstTitleElem = document.querySelector('.storylink');
  const firstTitleSelector = select(firstTitleElem);

  const firstCommentElem = document.querySelector('.subtext a+ a');
  const firstCommentSelector = select(firstCommentElem);

  const topBarElem = document.querySelector('.pagetop a+ a');
  const topBarSelector = select(topBarElem);

  const hideElem = document.querySelector('.age~ span+ a');
  const hideElemSelector = select(hideElem);

  suite
    .add('new helper (titles)', () => {
      helper.predictCss(document.querySelectorAll(firstTitleSelector), []);
    })
    .add('new helper (comments)', () => {
      helper.predictCss(
        document.querySelectorAll(firstTitleSelector),
        document.querySelectorAll([topBarSelector, hideElemSelector].join(','))
      );
    })
    .add('old helper (titles)', () => {
      oldHelper.predictCss(jQuery(firstTitleSelector), []);
    })
    .add('old helper (comments)', () => {
      oldHelper.predictCss(
        jQuery(firstTitleSelector),
        jQuery([topBarSelector, hideElemSelector].join(','))
      );
    })
    .on('cycle', function (event) {
      console.log(String(event.target));
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ async: true });
}
