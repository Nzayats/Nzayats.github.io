function bubbleChart() {
  var width = 1000;
  var height = 600;

  var tooltip = floatingTooltip('sf_tooltip', 240);

  var center = { x: width / 2, y: height / 2 };

  var titlesX = {
    0: 10,
    200: 10 + (width - 200) / 5,
    400: 10 + 2 * (width - 200) / 5,
    600: 10 + 3 * (width - 200) / 5,
    800: 10 + 4 * (width - 200) /5,
    1000: width - 200
  };

  var chargeForceStrength = 0.065;
  var XForceStrength = 0.2;
  var YForceStrength = 0.035;


  var svg = null;
  var bubbles = null;
  var nodes = [];
  var decay = 0.3;
  var alpha = 1;

  var current_display = "all_num";

  var category_sizes = {"1": 2, "2": 5, "3": 10, "4": 15, "5":30}

  var fillColor = d3.scaleOrdinal()
    .domain([0, 1, 2, 3, 4])
    .range(['#b5b5e5', '#8989bf', '#6b6ba5', '#515189', '#3a3a6d']);

  function charge(d) {
    return -Math.pow(d.radius, 2.0) * chargeForceStrength;
  }

  var simulation = d3.forceSimulation()
    .velocityDecay(decay)
    .force('x', d3.forceX().strength(XForceStrength).x(nodePos))
    .force('y', d3.forceY().strength(YForceStrength).y(center.y))
    .force('charge', d3.forceManyBody().strength(charge))
    .on('tick', ticked);

  simulation.stop();

  function createNodes(rawData) {
    var myNodes = rawData.map(function (d) {
      return {
        id: d.id,
        radius: category_sizes[d.payments_sum_categ],//rad
        payments_sum: +d.payments_sum,
        name: d.sub_object,
        num_bus: {
                  "all_num": d.all_num,
                  "lgbt_num": d.lgbt_num,
                  "women_num": d.women_num,
                  "smb_num": d.smb_num,
                  "veteran_num": d.veteran_num,
                  "minority_num": d.minority_num,
                  "women_minority_num": d.women_minority_num},
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    myNodes.sort(function (a, b) { return b.payments_sum - a.payments_sum; });

    return myNodes;
  }

  var chart = function chart(selector, rawData) {
    nodes = createNodes(rawData);

    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { return d.id; });

    var bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(Math.floor(d.num_bus["all_num"]/200)); })
      .attr('stroke', function (d) { return d3.rgb(fillColor(Math.floor(d.num_bus["all_num"]/200))).darker(); })
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);

    bubbles = bubbles.merge(bubblesE);

    bubbles.transition()
      .duration(2000)
      .attr('r', function (d) { return d.radius; });

    simulation.nodes(nodes);

    showTitles();

    simulation.alpha(alpha).restart();
  };

  function ticked() {
    bubbles
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y; });
  }

  function nodePos(d) {
    return 45 + ((width - 245)*d.num_bus[current_display])/width;
  }

  function showTitles() {
    var titlesData = d3.keys(titlesX);
    var titles = svg.selectAll('.numcomp')
      .data(titlesData);

    titles.enter().append('text')
      .attr('class', 'numcomp')
      .attr('x', function (d) { return titlesX[d]; })
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });

    titles.enter().append('text')
        .attr('class', 'numcomp')
        .attr('x', 700)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .text('Number of diverse vendors');
  }

  function showDetail(d) {
    d3.select(this).attr('stroke', 'black');

    var content = '<span class="name">Category: </span><span class="value">' +
                  d.name +
                  '</span><br/><br/>' +
                  '<span class="name">Total spending in 2017: </span><span class="value">$' +
                  addCommas(d.payments_sum) +
                  '</span><br/><br/>' +
                  '<span class="name">Diverse companies of all types: </span><span class="value">' +
                  d.num_bus["all_num"] +
                  '</span><br/><br/>' +
                  '<span class="name">Disabled veterans companies: </span><span class="value">' +
                  d.num_bus["veteran_num"] +
                  '</span><br/>' +
                  '<span class="name">Minorities companies: </span><span class="value">' +
                  d.num_bus["minority_num"] +
                  '</span><br/>' +
                  '<span class="name">Women companies: </span><span class="value">' +
                  d.num_bus["women_num"] +
                  '</span><br/>' +
                  '<span class="name">Women/minority companies: </span><span class="value">' +
                  d.num_bus["women_minority_num"] +
                  '</span><br/>' +
                  '<span class="name">Small businesses: </span><span class="value">' +
                  d.num_bus["smb_num"] +
                  '</span><br/>' +
                  '<span class="name">LGBT companies: </span><span class="value">' +
                  d.num_bus["lgbt_num"] +
                  '</span><br/>';

    tooltip.showTooltip(content, d3.event);
  }

  function hideDetail(d) {
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(Math.floor(d.num_bus["all_num"]/200))).darker());

    tooltip.hideTooltip();
  }

  chart.toggleDisplay = function (displayName) {
    current_display = displayName;
    simulation.force('x', d3.forceX().strength(XForceStrength).x(nodePos));
    simulation.alpha(alpha).restart();
  };

  return chart;
}

var myBubbleChart = bubbleChart();

function display(error, data) {
  if (error) {
    console.log(error);
  }

  myBubbleChart('#vis', data);
}

function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {
      d3.selectAll('.button').classed('active', false);

      var button = d3.select(this);
      button.classed('active', true);

      var buttonId = button.attr('id');
      myBubbleChart.toggleDisplay(buttonId);
    });
}

function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

d3.csv('data/sub_object_suppliers_2017.csv', display);

setupButtons();
