## Classes

<dl>
<dt><a href="#MssqlStatsParser">MssqlStatsParser</a></dt>
<dd><p>SQL Statistics Parser, outputs structured IO/TIME statistics data</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#determineRowType">determineRowType(row, descriptor)</a> ⇒ <code>RowEnum</code></dt>
<dd><p>Determines the type of row we are about to process</p>
</dd>
<dt><a href="#processTimeRow">processTimeRow(row, descriptor)</a> ⇒ <code>StatsTimeInfo</code></dt>
<dd><p>Parses statistics TIME output</p>
</dd>
<dt><a href="#processIORow">processIORow(row, descriptor)</a> ⇒ <code>StatsIOInfo</code></dt>
<dd><p>Processes statistics IO data for a table row</p>
</dd>
<dt><a href="#calculateIOTotals">calculateIOTotals(statInfos)</a> ⇒ <code>StatsInfoTotal</code></dt>
<dd><p>Aggregates and summarizes parsed IO statistics</p>
</dd>
</dl>

<a name="MssqlStatsParser"></a>

## MssqlStatsParser
SQL Statistics Parser, outputs structured IO/TIME statistics data

**Kind**: global class  
<a name="MssqlStatsParser+parseStatistics"></a>

### mssqlStatsParser.parseStatistics(statisticsText) ⇒ <code>StatsSummary</code>
Parses a mssql statistics blob and returns a structured response

**Kind**: instance method of [<code>MssqlStatsParser</code>](#MssqlStatsParser)  

| Param | Type | Description |
| --- | --- | --- |
| statisticsText | <code>string</code> | text blob of mssql statistics output |

<a name="determineRowType"></a>

## determineRowType(row, descriptor) ⇒ <code>RowEnum</code>
Determines the type of row we are about to process

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>string</code> | the row of statistics output to process |
| descriptor | <code>object</code> | contains metadata about the structure of statistics output |

<a name="processTimeRow"></a>

## processTimeRow(row, descriptor) ⇒ <code>StatsTimeInfo</code>
Parses statistics TIME output

**Kind**: global function  

| Param | Type |
| --- | --- |
| row | <code>string</code> | 
| descriptor | <code>descriptor</code> | 

<a name="processIORow"></a>

## processIORow(row, descriptor) ⇒ <code>StatsIOInfo</code>
Processes statistics IO data for a table row

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>string</code> | the row of statistics output to process |
| descriptor | <code>object</code> | contains metadata about the structure of statistics output |

<a name="calculateIOTotals"></a>

## calculateIOTotals(statInfos) ⇒ <code>StatsInfoTotal</code>
Aggregates and summarizes parsed IO statistics

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| statInfos | <code>Array.&lt;StatsIOInfo&gt;</code> | parsed IO statistics rows |

