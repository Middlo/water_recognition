# Water Recognition
## Introduction
Bachelor Thesis Project - AI Model that recognises bodies of water using satellite imagery.
This project is being developed as part of an experiment conducted for [Software Engineering and Management] Bachelor Thesis at [University of Gothenburg]. The goal of this project is to train an AI model that recognizes bodies of water using [LANDSAT] satellite imagery.

## Team
The research group consists of the following members:

- Ivica Crnkovic (Academic Supervisor)
- Arvin Esfahani Zadeh (Student)
- Sebastian Baszczynski (Student)

## Prerequisites
In order to use this project it is required to have access to and install the following:
- Python
- Conda
- Jupyter Notebook
- GDAL Library
- Google Earth Engine Library
- GEEMAP
- TensorFlow

## Installation
### Python and Conda
Install python from the following [link] and use the this [guide] to install conda, a python package and environment manager.
After successful installation of Python and Conda, Conda will be used to create a new environment and install the dependencies.
### Create and use a new environment
In order to create a new environment by entering the following text in your command line interface:
```
conda create -n water-recognition-env vs2015_runtime=14 python=3.8.8
```
Activate the conda environment:
```
conda activate water-recognition-env
```
### Install Libraries
Use the following commands in your preferred command line interface. Ensure you're in the correct conda environment by activating your preferred conda environment.
#### Jupyter Notebook
```
conda install -c conda-forge jupyterlab
```
#### GDAL
```
conda install -c conda-forge gdal
```
#### Google Earth Engine
```
conda install -c conda-forge earthengine-api
```
#### GEEMAP
```
conda install -c conda-forge geemap
```
#### TensorFlow
```
conda install -c conda-forge tensorflow
```
#### OpenCV
```
conda install -c conda-forge opencv
```
#### TQDM
```
conda install -c conda-forge tqdm
```
#### TFLearn
```
conda install -c contango tflearn
```
### Using your environment in the Jupyter Notebook
In order to use your environment in the Jupyter Notebook you need to run the following command:
```
python -m ipykernel install --user --name=water-recognition-env
```
Now you can run Jupyter Notebook and you will have water-recognition-env as one of its kernel.
It is highly recommended to use this kernel as it has all of the required dependecies installed.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job)
   [University Of Gothenburg]: <https://www.gu.se/en>
   [Software Engineering and Management]: <https://www.gu.se/en/study-gothenburg/software-engineering-and-management-bachelors-programme-n1sof>
   [LANDSAT]: <https://landsat.com>
   [link]: <https://www.python.org/downloads/>
   [guide]: <https://conda.io/projects/conda/en/latest/user-guide/install/index.html>
   
  
