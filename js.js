
// Set up page
document.getElementById('pageTitle').innerHTML=pageTitle;
document.getElementById('instructions').innerHTML=instructions;
document.title=pageTitle;

if (openingImage.length>0)
{
	document.getElementById('openingPageImage').src=openingImage;
	document.getElementById('openingPage').style.display='';
	document.getElementById('mainPage').style.display='none';
}

var option = document.createElement("option");
option.text = "- Select position level -";
option.value = "";
document.getElementById('position1').add(option);
var option = document.createElement("option");
option.text = "- Select position to compare -";
option.value = "";
document.getElementById('position2').add(option);
for (var i=0;i<positions.length;i++)
{
	option = document.createElement("option");
	option.text = positions[i][3]+' - '+positions[i][1];
	option.value = positions[i][1];
	document.getElementById('position1').add(option);
	option = document.createElement("option");
	option.text = positions[i][3]+' - '+positions[i][1];
	option.value = positions[i][1];
	document.getElementById('position2').add(option);
}

var option = document.createElement("option");
option.text = "- Select dimension" + (developmentResourcesTitle.length>0?" or development resources":"") + " -";
option.value = "";
document.getElementById('dimension').add(option);
for (var i=0;i<dimensions.length;i++)
{
	option = document.createElement("option");
	option.text = dimensions[i][3];
	option.value = dimensions[i][3];
	document.getElementById('dimension').add(option);
}
if (developmentResourcesTitle.length>0)
{
	var option = document.createElement("option");
	option.text = developmentResourcesTitle
	option.value = "-1";
	document.getElementById('dimension').add(option);
}


// Calculate how many rows for each header
for (var i=0;i<headers.length;i++)
{
	for (var j=0;j<dimensions.length;j++)
	{
		if (dimensions[j][1]==headers[i][0])
		{
			if (headers[i][3]==undefined)
				headers[i][3]=1;
			else
				headers[i][3]++;
		}
	}
}

// Assign a dimension index to each data
for (var i=0;i<data.length;i++)
{
	for (var j=0;j<dimensions.length;j++)
	{
		if (data[i][1]==dimensions[j][0])
		{
			data[i][3]=j;
		}

	}
}
// Assign a position index to each data
for (var i=0;i<data.length;i++)
{
	for (var j=0;j<positions.length;j++)
	{
		if (data[i][0]==positions[j][0])
		{
			data[i][4]=j;
		}

	}
}

document.getElementById('developmentResourcesTitle').innerHTML=developmentResourcesTitle;

var option = document.createElement("option");
option.text = "- Select learning level -";
option.value = "";
document.getElementById('developmentPosition').add(option);
for (var i=0;i<developmentPositions.length;i++)
{
	option = document.createElement("option");
	option.text = developmentPositions[i][1];
	option.value = developmentPositions[i][1];
	document.getElementById('developmentPosition').add(option);
}

var option = document.createElement("option");
option.text = "- Select resources by core capability -";
option.value = "";
document.getElementById('developmentDimension').add(option);
for (var i=0;i<developmentDimensions.length;i++)
{
	option = document.createElement("option");
	option.text = developmentDimensions[i][2];
	option.value = developmentDimensions[i][2];
	document.getElementById('developmentDimension').add(option);
}

function updateScreen()
{
	document.getElementById('results').innerHTML='';
	document.getElementById('positionTitle').innerHTML='';
	document.getElementById('distributionTitle').innerHTML='';

	position1=document.getElementById('position1').selectedIndex-1;
	position2=document.getElementById('position2').selectedIndex-1;
	dimension=document.getElementById('dimension').selectedIndex-1;

	if (document.getElementById('dimension').value==-1)
	{
		document.getElementById('resultsSection').style.display='none'
		document.getElementById('developmentResourcesSection').style.display=''
	}
	else if (document.getElementById('dimension').value=='')
	{
		document.getElementById('resultsSection').style.display=''
		document.getElementById('developmentResourcesSection').style.display=(developmentResourcesTitle.length>0?'':'none');
	}
	else
	{
		document.getElementById('resultsSection').style.display=''
		document.getElementById('developmentResourcesSection').style.display='none'
	}


	document.getElementById('positionTitle').innerHTML=(position1>=0 ? '<strong>Position Title</strong>: ' + positions[position1][1] + (position2>=0 ? ' and ' + positions[position2][1] : ''): '');

	//document.getElementById('print').style.display=(position1>=0?'':'none');

	var headerCount=0
	var headerRowCount=0
	var odd=false;

	var row = document.getElementById('results').insertRow(document.getElementById('results').rows.length);
	row.className='logo '+(odd?'dataOddRow':'dataEvenRow');odd=!odd;
	var cell = row.insertCell(0);
	cell.innerHTML='<img src="'+logo+'"><br>'+mainTitle;
	cell.rowSpan=3+(expectedDistributionTitle.length>0?1:0)+(dimensionsTitle.length>0?1:0);
	cell.style.fontWeight="bold";
	cell.style.textAlign="center";

	var cell = row.insertCell(1);
	cell.colSpan=2;
	cell.innerHTML='';
	cell.style.minWidth='220px';
	cell.className='oddRow topCell1';

	if (definitionTitle.length>0)
	{
		var cell = row.insertCell(2);
		cell.style.minWidth='220px';
		cell.innerHTML=definitionTitle;
		cell.style.fontWeight="bold";
		cell.style.textAlign="center";
		cell.className='oddRow topCell2';
	}

	for (i=0;i<positions.length;i++)
	{
		if (position1==-1 || i==position1 || i==position2)
		{
			var cell = row.insertCell(row.cells.length);
			cell.innerHTML='';
			cell.className='dataOddRow topCell3 '+(i==positions.length-1 || (i==position1 && position2==-1) || i==position2?'':'dimensionImage');
			cell.style.minWidth='230px';
		}
	}

	var row = document.getElementById('results').insertRow(document.getElementById('results').rows.length);

	var cell = row.insertCell(0);
	cell.innerHTML=descriptionTitle;
	cell.colSpan=2;
	cell.className='jobBackground bold thickRow';

	if (definitionTitle.length>0)
	{
		var cell = row.insertCell(1);
		cell.innerHTML=descriptionDefinition;
		cell.className='definitions thickRow';
	}
	for (i=0;i<positions.length;i++)
	{
		if (position1==-1 || i==position1 || i==position2)
		{
			var cell = row.insertCell(row.cells.length);
			cell.innerHTML=positions[i][3];
			cell.className='jobBackground thickRow';
		}
	}

	var row = document.getElementById('results').insertRow(document.getElementById('results').rows.length);
	row.className=(odd?'dataOddRow':'dataEvenRow');odd=!odd;
	var cell = row.insertCell(0);
	cell.innerHTML='<img src="'+positionTitlesImage+'">';
	cell.className='dimensionImage positionTitle thickRow';
	var cell = row.insertCell(1);
	cell.innerHTML=positionTitlesTitle;
	cell.className='dimensionTitle positionTitle thickRow';

	if (definitionTitle.length>0)
	{
		var cell = row.insertCell(2);
		cell.innerHTML=positionTitlesDefinition;
		cell.className='definitions thickRow';
	}
	for (i=0;i<positions.length;i++)
	{
		if (position1==-1 || i==position1 || i==position2)
		{
			var cell = row.insertCell(row.cells.length);
			cell.innerHTML=positions[i][1];
			cell.className='positionBackground thickRow';
		}
	}

	if (expectedDistributionTitle.length>0)
	{
		var row = document.getElementById('results').insertRow(document.getElementById('results').rows.length);
		row.className=(odd?'dataOddRow':'dataEvenRow');odd=!odd;
		var cell = row.insertCell(0);
		cell.innerHTML='<img src="'+expectedDistributionImage+'">';
		cell.className='dimensionImage distributionTitle thickRow';

		var cell = row.insertCell(1);
		cell.innerHTML=expectedDistributionTitle;
		cell.className='dimensionTitle distributionTitle thickRow';
		if (definitionTitle.length>0)
		{
			var cell = row.insertCell(2);
			cell.innerHTML=expectedDistributionDefinition;
			cell.className='definitions thickRow';
		}
		for (i=0;i<positions.length;i++)
		{
			if (position1==-1 || i==position1 || i==position2)
			{
				var cell = row.insertCell(row.cells.length);
				cell.innerHTML=positions[i][2];
			cell.className='distributionBackground thickRow';
			}
		}
	}

	if (dimensionsTitle.length>0)
	{
		var row = document.getElementById('results').insertRow(document.getElementById('results').rows.length);
		row.className=(odd?'dataOddRow':'dataEvenRow');odd=!odd;
		var cell = row.insertCell(0);
		cell.innerHTML=dimensionsTitle;
		cell.colSpan=2;
		cell.className='dimensionBackground bold thickRow';
		if (definitionTitle.length>0)
		{
			var cell = row.insertCell(1);
			cell.innerHTML=dimensionsDefinition;
			cell.className='definitions thickRow';
		}
		for (i=0;i<positions.length;i++)
		{
			if (position1==-1 || i==position1 || i==position2)
			{
				var cell = row.insertCell(row.cells.length);
				cell.className='dimensionBackground thickRow'
			}
		}
	}


	var headerOdd=false;
	for (var i=0;i<dimensions.length;i++)
	{
		if (dimension==-1 || dimension==i)
		{
			var row = document.getElementById('results').insertRow(document.getElementById('results').rows.length);
			row.className=(odd?'dataOddRow':'dataEvenRow');odd=!odd;

			if (headerRowCount==0)
			{
				var cell = row.insertCell(0);
				cell.innerHTML='<div>'+(headers[headerCount][1].length>0?'<img src="'+headers[headerCount][1]+'"><br>':'')+headers[headerCount][2]+'</div>';
				cell.className='rotate header'+(headerCount+1)+' '+(headerOdd?'headerOddRow':'headerEvenRow');headerOdd=!headerOdd;
				if (dimension==-1)
					cell.rowSpan=headers[headerCount][3]
			}
			headerRowCount++;

			var cell = row.insertCell(row.cells.length);
			cell.innerHTML=(dimensions[i][2].length>0?'<img src="'+dimensions[i][2]+'"> ':'');
			cell.className=(odd?'dimensionBackgroundOdd':'dimensionBackgroundEven')+' thickRow dimensionImage dimension'+(i+1);

			var cell = row.insertCell(row.cells.length);
			cell.innerHTML=dimensions[i][3];
			cell.className=(odd?'dimensionBackgroundOdd':'dimensionBackgroundEven')+' thickRow dimensionTitle dimension'+(i+1);
			if (definitionTitle.length>0)
			{
				var cell = row.insertCell(row.cells.length);
				cell.innerHTML=dimensions[i][4];
				cell.className='definitions thickRow definition'+(i+1);
			}

			for (position=0;position<positions.length;position++)
			{
				for (var j=0;j<data.length;j++)
				{
					if (data[j][0]==positions[position][0] && data[j][1]==dimensions[i][0] && (position1==-1 || position==position1 || position==position2))
					{
						var cell = row.insertCell(row.cells.length);
						cell.className='dataCell thickRow';
						var dataText=data[j][2]
						if (position1>0)
						{
							// Replace data text
							for (var l=0;l<data.length;l++)
							{
								if (data[j][1]==data[l][1] && (position1==-1 || data[l][0]!=positions[position1][0]) && (position2==-1 || data[l][0]!=positions[position2][0])) // same position, won't replace any positions that are currently selected
								{
									//console.log('POSITION '+k+' '+position1+' '+position2+' '+data[l][0]+' '+data[l][2])
									//dataText=dataText.replace('Same as '+positions[data[l][4]][1],data[l][2])
									//dataText=dataText.replace('Same as '+positions[data[l][4]][3],data[l][2])
								}
							}
						}

						cell.innerHTML=dataText;
						cell.onclick=function()
						{
							if (this.style.boxShadow=="")
								this.style.boxShadow="0px 0px 15px #666";
							else
								this.style.boxShadow="";
						}
					}
				}
			}

			if (headerRowCount==headers[headerCount][3])
			{
				headerCount++;
				headerRowCount=0;
			}
		}
	}

	// Development resources

	if (developmentResourcesTitle.length>0)
	{

		dimension=document.getElementById('developmentDimension').selectedIndex-1;
		position=document.getElementById('developmentPosition').selectedIndex-1;

		// Calculate how many rows for each dimension
		for (var i=0;i<developmentDimensions.length;i++)
		{
			developmentDimensions[i][4]=undefined;
			for (var j=0;j<developmentPositions.length;j++)
			{
				counter=0
				if (position==-1 || position==j)
				{
					for (var k=0;k<developmentData.length;k++)
					{
						if (developmentData[k][0]==developmentPositions[j][0] && developmentData[k][1]==developmentDimensions[i][0])
						{
							counter++;
						}
					}
				}
				if (developmentDimensions[i][4]==undefined)
					developmentDimensions[i][4]=counter;
				else if (developmentDimensions[i][4]<counter)
					developmentDimensions[i][4]=counter;
			}
		}
		var cleverArray=[[[]]];
		for (var i=0;i<developmentDimensions.length;i++)
		{
			cleverArray.push([]);
			for (var j=0;j<developmentPositions.length;j++)
			{
				cleverArray[i].push([]);
				for (var k=0;k<developmentData.length;k++)
				{
					if (developmentData[k][0]==developmentPositions[j][0] && developmentData[k][1]==developmentDimensions[i][0])
					{
						cleverArray[i][j].push(k);
					}
				}
			}
		}

		document.getElementById('developmentResources').innerHTML='';

		odd=false;

		var row = document.getElementById('developmentResources').insertRow(document.getElementById('developmentResources').rows.length);
		row.className=(odd?'dataOddRow':'dataEvenRow');odd=!odd;
		var cell = row.insertCell(0);
		cell.innerHTML=developmentResourcesSubTitle;
		cell.rowSpan=2;
		cell.style.fontWeight="bold";
		cell.style.textAlign="center";

		for (i=0;i<developmentPositions.length;i++)
		{
			if (position==-1 || position==i)
			{
				var cell = row.insertCell(row.cells.length);
				cell.innerHTML=developmentPositions[i][1];
				cell.className='dimensionTitle';
				cell.colSpan=developmentHeadings.length;
				cell.style.textAlign="center";
			}
		}

		odd=!odd;

		var row = document.getElementById('developmentResources').insertRow(document.getElementById('developmentResources').rows.length);
		row.className=(odd?'dataOddRow':'dataEvenRow');odd=!odd;
		for (i=0;i<developmentPositions.length;i++)
		{
			if (position==-1 || position==i)
			{
				for (j=0;j<developmentHeadings.length;j++)
				{
					var cell = row.insertCell(row.cells.length);
					cell.innerHTML=developmentHeadings[j][1];
					cell.className='jobBackground';
					cell.style.minWidth=developmentHeadings[j][2]+'px';
				}
			}
		}

		headerOdd=false;
		for (var i=0;i<developmentDimensions.length;i++)
		{
			rowCount=0;
			if (dimension==-1 || dimension==i)
			{
				var row = document.getElementById('developmentResources').insertRow(document.getElementById('developmentResources').rows.length);
				row.className=(odd?'dataOddRow':'dataEvenRow');odd=!odd;

				var cell = row.insertCell(0);
				cell.innerHTML='<div>'+(developmentDimensions[i][1].length>0?'<img src="'+developmentDimensions[i][1]+'"><br>':'')+developmentDimensions[i][2]+'</div>';
				cell.className='rotate '+(headerOdd?'headerOddRow':'headerEvenRow');headerOdd=!headerOdd;
				cell.rowSpan=developmentDimensions[i][4]

				for (j=0;j<developmentDimensions[i][4];j++)
				{

					if (j>0)
					{
						var row = document.getElementById('developmentResources').insertRow(document.getElementById('developmentResources').rows.length);
						row.className=(odd?'dataOddRow':'dataEvenRow');odd=!odd;
					}

					for (var k=0;k<developmentPositions.length;k++)
					{
						if (position==-1 || position==k)
						{
							for (l=0;l<developmentHeadings.length;l++)
							{
								var cell = row.insertCell(row.cells.length);
								cell.className='dataCell';
								dataText='';
								if (cleverArray[i][k][j]!=undefined)
								{
									dataText=developmentData[cleverArray[i][k][j]][2+l]
								}
								cell.innerHTML=dataText;
								cell.onclick=function()
								{
									if (this.style.boxShadow=="")
										this.style.boxShadow="0px 0px 15px #666";
									else
										this.style.boxShadow="";
								}
							}
						}
					}
				}
			}
		}
	}

}
//updateScreen()
