/* JAVASCRIPT CODE GOES HERE */

Plotly.d3.csv("https://raw.githubusercontent.com/phamoh/HIV_AB_CoEvo/phamoh-patch-1/dataset_031519.csv",
    function(err, rows) {

        function unpack(rows, key) {
            return rows.map(function(row) {
                return row[key];
            });
        }

        var allPatientIDs = unpack(rows, 'patient_id'),
            allTimePoints = unpack(rows, 'time_point'),
            allHIVSelection = unpack(rows, 'hiv_selection_dN_dS'),
            allselectionABCDR = unpack(rows, 'abr_baseline_mean_sigma_CDR'),
            allselectionABFWR = unpack(rows, 'abr_baseline_mean_sigma_FWR'),
            currentPatient,
            listofPatients = [],
            listofPatientsALL = [],
            currentHIV_Selec = [],
            currentABCDR = [],
            currentABFWR = [],
            currentTimePoint = [];

        //This affects the dropdown menu
        //This affects the dropdown menu

        for (var i = 0; i < allPatientIDs.length; i++) {
            if (listofPatientsALL.indexOf(allPatientIDs[i]) === -1) {
                listofPatientsALL.push(allPatientIDs[i]);
            }
        }
        listofPatientsALL.push("All Patients");


        function assignOptions(textArray, selector) {
            for (var i = 0; i < textArray.length; i++) {
                var currentOption = document.createElement('option');
                currentOption.text = textArray[i];
                selector.appendChild(currentOption);
            }
        };

        // This code populates the info to the plots and the dropdowns.
        var innerContainer7 = document.querySelector('[data-num7="0"]'),
            patientSelector7 = innerContainer7.querySelector('.patientdata7'),
            innerContainer8 = document.querySelector('[data-num8="0"]'),
            patientSelector8 = innerContainer8.querySelector('.patientdata8'),
            innerContainer9 = document.querySelector('[data-num9="0"]'),
            patientSelector9 = innerContainer9.querySelector('.patientdata9');


        assignOptions(listofPatientsALL, patientSelector7);
        assignOptions(listofPatientsALL, patientSelector8);
        assignOptions(listofPatientsALL, patientSelector9);

        var trace1 = [];
        var trace2 = [];

        function getPatientDataHIV_Selec(chosenPatient) {
            currentHIV_Selec = [];
            currentTimePoint = [];
            trace1 = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (chosenPatient === 'All Patients') {
                    trace1 = {
                        type: 'scatter',
                        mode: 'lines+markers',
                        x: allTimePoints,
                        y: allHIVSelection,
                        connectgaps: true,
                        text: allPatientIDs,
                        transforms: [{
                            type: 'groupby',
                            groups: allPatientIDs,
                        }]
                    }
                } else if (allPatientIDs[i] === chosenPatient) {
                    currentHIV_Selec.push(allHIVSelection[i]);
                    currentTimePoint.push(allTimePoints[i]);
                    trace1 = {
                        x: currentTimePoint,
                        y: currentHIV_Selec,
                        mode: 'lines+markers',
                        type: 'scatter',
                        connectgaps: true,
                        line: {
                            color: 'rgb(0, 0, 153)',
                        },
                        marker: {
                            size: 12,
                            opacity: 0.5
                        },
                    }
                }
            }
        };

        function getPatientDataABCDR(chosenPatient) {
            currentABCDR = [];
            currentTimePoint = [];
            trace1 = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (chosenPatient === 'All Patients') {
                    trace1 = {
                        type: 'scatter',
                        mode: 'lines+markers',
                        x: allTimePoints,
                        y: allselectionABCDR,
                        connectgaps: true,
                        text: allPatientIDs,
                        transforms: [{
                            type: 'groupby',
                            groups: allPatientIDs,
                        }]
                    }
                } else if (allPatientIDs[i] === chosenPatient) {
                    currentABCDR.push(allselectionABCDR[i]);
                    currentTimePoint.push(allTimePoints[i]);
                    trace1 = {
                        x: currentTimePoint,
                        y: currentABCDR,
                        mode: 'lines+markers',
                        type: 'scatter',
                        connectgaps: true,
                        line: {
                            color: 'rrgb(0, 204, 102)',
                        },
                        marker: {
                            size: 12,
                            opacity: 0.5
                        },
                    }
                }
            }
        };

        function getPatientDataABFWR(chosenPatient) {
            currentABFWR = [];
            currentTimePoint = [];
            trace1 = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (chosenPatient === 'All Patients') {
                    trace1 = {
                        type: 'scatter',
                        mode: 'lines+markers',
                        x: allTimePoints,
                        y: allselectionABFWR,
                        connectgaps: true,
                        text: allPatientIDs,
                        transforms: [{
                            type: 'groupby',
                            groups: allPatientIDs,
                        }]
                    }
                } else if (allPatientIDs[i] === chosenPatient) {
                    currentABFWR.push(allselectionABFWR[i]);
                    currentTimePoint.push(allTimePoints[i]);
                    trace1 = {
                        x: currentTimePoint,
                        y: currentABFWR,
                        mode: 'lines+markers',
                        type: 'scatter',
                        connectgaps: true,
                        line: {
                            color: 'rgb(204, 0, 102)',
                        },
                        marker: {
                            size: 12,
                            opacity: 0.5
                        },
                    }
                }
            }
        };

        setBubblePlotHIV_Selec("1");
        setBubblePlotABCDR("1");
        setBubblePlotABFWR("1");

        function setBubblePlotHIV_Selec(chosenPatient) {
            getPatientDataHIV_Selec(chosenPatient);
            var data = [trace1];
            var layout = {
                title: 'HIV Selection of Patient: ' + chosenPatient,
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
                    title: 'dN/dS',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }
            };
            Plotly.newPlot('plotdiv7', data, layout, { showSendToCloud: true, responsive: true });
        };

        function setBubblePlotABCDR(chosenPatient) {
            getPatientDataABCDR(chosenPatient);
            var data = [trace1];
            var layout = {
                title: 'AbR Selection in the CDR of Patient ' + chosenPatient,
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
                    title: 'mean Σ CDR',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }
            };
            Plotly.newPlot('plotdiv8', data, layout, { showSendToCloud: true, responsive: true });
        };

        function setBubblePlotABFWR(chosenPatient) {
            getPatientDataABFWR(chosenPatient);
            var data = [trace1];
            var layout = {
                title: 'AbR Selection in the FWR of Patient: ' + chosenPatient,
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
                    title: 'mean Σ FWR',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }
            };
            Plotly.newPlot('plotdiv9', data, layout, { showSendToCloud: true, responsive: true });
        };


        function updatePatientHIV_Selec() {
            setBubblePlotHIV_Selec(patientSelector7.value);
        }

        function updatePatientABCDR() {
            setBubblePlotABCDR(patientSelector8.value);
        }

        function updatePatientABFWR() {
            setBubblePlotABFWR(patientSelector9.value);
        }

        patientSelector7.addEventListener('change', updatePatientHIV_Selec, false);
        patientSelector8.addEventListener('change', updatePatientABCDR, false);
        patientSelector9.addEventListener('change', updatePatientABFWR, false);


    });