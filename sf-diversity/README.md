# Analysis goal

In my analysis I’m going to review the current state of supply chain diversity in SF City and suggest
potential areas for improvement.

# Why is supplier diversity important?

Supplier diversity commitment is much more than just a social program designed to benefit selected groups. 
Many companies that have already implemented an effective strategy have realized its competitive advantages because it:
* drives competition 
* provides multiple channels from which to procure goods and services
* promotes innovation through the entrance of new products and services
* economic growth of all communities

# Potential decision makers 

* [SF Commission on the Status of Women](https://sfgov.org/dosw/san-francisco-commission-status-women)
* [Veterans Affairs Commision](https://sfgov.org/vets/)

# Data

The analysis is based on: 

* [SFGov open database of payments made to vendors from fiscal year 2007 forward](https://data.sfgov.org/City-Management-and-Ethics/Vendor-Payments-Vouchers-/n9pm-xkyq) - only 2017 data is used
* [Supplier Clearinghouse](https://sch.thesupplierclearinghouse.com/FrontEnd/SearchCertifiedDirectory.asp) - open directory of certified women, minority, LGBT, and disabled veteran-owned businesses

Certification types in the file are:

*	Disabled Veteran Business Enterprise (DVBE)
*	LGBT Business Enterprise (LGBT)
*	Minority Business Enterprise (MBE)
*	Small Business Administration (8(a))
*	Women Business Enterprise (WBE)
*	Women/Minority Business Enterprise (WMBE)

## Data analysis

After combining the data sources, I found that there is a huge opportunity for SFGov to increase the diversity spend in their supply chain. Their current supplier diversity is quite low compared to the industry benchmarks. Based on the Supplier Clearinghouse data, budget spent on diverse suppliers was roughly 1% of the total vendor payments, while leading companies are usually spending 10-20% from their budget on minority-owned businesses.

## Data visualization

I'd like to help the decision makers to identify best opportunities for improvement: areas with high spend and big pool of certified diverse suppliers. 

In order to visually find those areas I’m using animated bubble chart. 
In the chart, each bubble represents spending category, bubbles size is a representation of the budget size 
of the category and the location of the bubble on the x-axis shows the number of potential diverse suppliers 
that can be hired for the jobs in the category.

I’ve added a categorization to the budget size in each category (<$1M, $1-5M, $5-10M, $10-50M, $50M+). 

The bubbles are color coded based on the number of potential diverse suppliers in the category, 
duplicating the location information for greater visibility.

Decision maker can slice and dice the data by different types of minorities using the tabs on the graph.

# References
* Project demo: http://nzayats.github.io/sf-diversity/index.html
* Code: https://nzayats.github.io/sf-diversity/index.html
* The code for the visualization is based on a great tutorial by Jim Vallandingham: 
http://vallandingham.me/bubble_charts_in_d3.html




