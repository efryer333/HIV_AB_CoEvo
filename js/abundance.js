Plotly.d3.csv("https://raw.githubusercontent.com/phamoh/HIV_AB_CoEvo/phamoh-patch-1/dataset_031519.csv",
    function(err, rows) {

        function unpack(rows, key) {
            return rows.map(function(row) {
                return row[key];
            });
        }

        var allPatientIDs = unpack(rows, 'patient_id'),
            allTimePoints = unpack(rows, 'time_point'),
            allCD4Count = unpack(rows, 'CD4_count'),
            allViralLoad = unpack(rows, 'viral_load'),
            currentPatient,
            listofPatients = [],
            currentData = [],
            currentTimePoint = [];

        //This affects the dropdown menu
        for (var i = 0; i < allPatientIDs.length; i++) {
            if (listofPatients.indexOf(allPatientIDs[i]) === -1) {
                listofPatients.push(allPatientIDs[i]);
            }
        }
        listofPatients.push("All Patients");

        function assignOptions(textArray, selector) {
            for (var i = 0; i < textArray.length; i++) {
                var currentOption = document.createElement('option');
                currentOption.text = textArray[i];
                selector.appendChild(currentOption);
            }
        };

        // This code populates the info to the plots and the dropdowns.
        //Dropdown9: CD4 count
        var innerContainer10 = document.querySelector('[data-num10="0"]'),
            patientSelector10 = innerContainer10.querySelector('.patientdata10'),
            //Dropdown10: viral load
            innerContainer11 = document.querySelector('[data-num11="0"]'),
            patientSelector11 = innerContainer11.querySelector('.patientdata11');

        assignOptions(listofPatients, patientSelector10);
        assignOptions(listofPatients, patientSelector11);

        var trace1 = [];
        var trace2 = [];

        function getPatientDataCD4Count(chosenPatient) {
            currentCD4Count = [];
            currentTimePoint = [];
            trace1 = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (chosenPatient === 'All Patients') {
                    trace1 = {
                        type: 'scatter',
                        mode: 'lines+markers',
                        x: allTimePoints,
                        y: allCD4Count,
                        connectgaps: true,
                        text: allPatientIDs,
                        transforms: [{
                            type: 'groupby',
                            groups: allPatientIDs,
                        }]
                    }
                } else if (allPatientIDs[i] === chosenPatient) {
                    currentCD4Count.push(allCD4Count[i]);
                    currentTimePoint.push(allTimePoints[i]);
                    trace1 = {
                        x: currentTimePoint,
                        y: currentCD4Count,
                        mode: 'lines+markers',
                        type: 'scatter',
                        connectgaps: true,
                        line: {

                            color: '#d62728'
                        },
                        marker: {
                            size: 12,
                            opacity: 0.5
                        },
                    }
                }
            }
        };

        function getPatientDataViralLoad(chosenPatient) {
            currentViralLoad = [];
            currentTimePoint = [];
            trace1 = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (chosenPatient === 'All Patients') {
                    trace1 = {
                        type: 'scatter',
                        mode: 'lines+markers',
                        x: allTimePoints,
                        y: allViralLoad,
                        connectgaps: true,
                        text: allPatientIDs,
                        transforms: [{
                            type: 'groupby',
                            groups: allPatientIDs,
                        }]
                    }
                } else if (allPatientIDs[i] === chosenPatient) {
                    currentViralLoad.push(allViralLoad[i]);
                    currentTimePoint.push(allTimePoints[i]);
                    trace1 = {
                        x: currentTimePoint,
                        y: currentViralLoad,
                        mode: 'lines+markers',
                        type: 'scatter',
                        connectgaps: true,
                        line: {
                            color: '#17becf',
                        },
                        marker: {
                            size: 12,
                            opacity: 0.5
                        },
                    }
                }
            }
        };


        setBubblePlotCD4Count("1");
        setBubblePlotViralLoad("1");



        function setBubblePlotCD4Count(chosenPatient) {
            getPatientDataCD4Count(chosenPatient);
            var data = [trace1];
            var layout = {
                title: 'CD4 Count of Patient ' + chosenPatient,
                titlefont: {
                    family: 'Poppins, sans-serif',
                },
                xaxis: {
                    title: 'Estimated Time Since Infection (years)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                },
                yaxis: {
                    title: ' # of blood cells in a cubic milliliter of blood',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }
            };
            Plotly.newPlot('plotdiv10', data, layout, { showSendToCloud: true, responsive: true });
        };

        function setBubblePlotViralLoad(chosenPatient) {
            getPatientDataViralLoad(chosenPatient);
            var data = [trace1];
            var layout = {
                title: 'CD4 Count of Patient ' + chosenPatient,
                titlefont: {
                    family: 'Poppins, sans-serif',
                },
                xaxis: {
                    title: 'Estimated Time Since Infection (years)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                },
                yaxis: {
                    title: '# of copies per milliliter of blood',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }
            };
            Plotly.newPlot('plotdiv11', data, layout, { showSendToCloud: true, responsive: true });
        };




        function updatePatientCD4Count() {
            setBubblePlotCD4Count(patientSelector10.value);
        }

        function updatePatientViralLoad() {
            setBubblePlotViralLoad(patientSelector11.value);
        }



        patientSelector10.addEventListener('change', updatePatientCD4Count, false);
        patientSelector11.addEventListener('change', updatePatientViralLoad, false);



    });